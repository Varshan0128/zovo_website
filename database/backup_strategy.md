# ZOVO Database Backup & Disaster Recovery Strategy

This document details the production backup, retention, and disaster recovery policies for ZOVO's PostgreSQL database.

---

## 1. Backup Strategy Overview

| Tier | Frequency | Storage Location | Retention | Purpose |
|------|-----------|------------------|-----------|---------|
| **Continuous (WAL)** | Continuous / Real-time | S3 / Cloud Storage | 7–14 days | Point-In-Time Recovery (PITR) down to the second |
| **Daily Full Dump** | Every 24 hours (02:00 UTC) | Encrypted Object Storage | 30 days | Nightly baseline snapshot |
| **Weekly Snapshot** | Every Sunday | Cold Storage / Glacier | 90 days | Long-term operational retention |
| **Pre-Migration Snapshot** | Prior to running any migration | Local & Cloud | 14 days | Instant rollback before schema changes |

---

## 2. Automated Daily Logical Dump (`pg_dump`)

### Command

```bash
# Compressed binary custom format dump
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -F c -b -v -f /backups/zovo_$(date +%Y%m%d_%H%M%S).dump $DB_NAME
```

### Scheduled Cron Script Example

```bash
#!/usr/bin/env bash
set -eo pipefail

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="/tmp/zovo_${TIMESTAMP}.dump.gz"
S3_BUCKET="s3://zovo-production-backups/postgres"

# Execute pg_dump with compression
pg_dump "$DATABASE_URL" -F c | gzip > "$BACKUP_FILE"

# Upload to encrypted S3 bucket
aws s3 cp "$BACKUP_FILE" "${S3_BUCKET}/zovo_${TIMESTAMP}.dump.gz" --sse AES256

# Remove local temp file
rm "$BACKUP_FILE"

echo "[OK] Backup completed and uploaded: zovo_${TIMESTAMP}.dump.gz"
```

---

## 3. Managed Services (Supabase / Render / AWS RDS)

If using **Supabase** or **AWS RDS**:
- **Point-in-Time Recovery (PITR)** is enabled automatically on Pro tiers.
- Physical snapshots occur daily with 0 downtime.
- In Supabase dashboard: Navigate to `Project Settings -> Database -> Backups` to trigger manual snapshots before major updates.

---

## 4. Restoration Procedure

### Restoring to a Test / Staging Environment

1. Download backup file:
   ```bash
   aws s3 cp s3://zovo-production-backups/postgres/zovo_20261007_020000.dump.gz ./
   gunzip zovo_20261007_020000.dump.gz
   ```

2. Restore with `pg_restore`:
   ```bash
   pg_restore -h $RESTORE_HOST -U $RESTORE_USER -d $TARGET_DB -v --clean --no-owner zovo_20261007_020000.dump
   ```

---

## 5. Security & Safety Rules

1. **Destructive Operations**: Never run `DROP TABLE` or `TRUNCATE` in automated scripts.
2. **Admin Deletion Safeguard**: The admin dashboard requires explicit confirmation modals before deleting any record.
3. **Audit Trail**: High-impact administrative actions are recorded in the `audit_logs` table.
4. **Encryption at Rest**: All backup files in cloud storage must utilize AES-256 server-side encryption.
