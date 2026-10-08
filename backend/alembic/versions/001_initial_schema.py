"""Initial schema for ZOVO platform

Revision ID: 001_initial
Revises: 
Create Date: 2026-10-07 12:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001_initial'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # users
    op.create_table(
        'users',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('is_superuser', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    # contact_submissions
    op.create_table(
        'contact_submissions',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=100), nullable=True),
        sa.Column('company', sa.String(length=255), nullable=True),
        sa.Column('service', sa.String(length=100), nullable=False),
        sa.Column('budget', sa.String(length=100), nullable=True),
        sa.Column('timeline', sa.String(length=100), nullable=True),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('source', sa.String(length=255), nullable=True),
        sa.Column('consent', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='NEW'),
        sa.Column('priority', sa.String(length=50), nullable=False, server_default='MEDIUM'),
        sa.Column('admin_notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_contact_submissions_email'), 'contact_submissions', ['email'], unique=False)
    op.create_index(op.f('ix_contact_submissions_status'), 'contact_submissions', ['status'], unique=False)
    op.create_index(op.f('ix_contact_submissions_created_at'), 'contact_submissions', ['created_at'], unique=False)

    # projects
    op.create_table(
        'projects',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('slug', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=False),
        sa.Column('thumbnail', sa.String(length=500), nullable=True),
        sa.Column('images', sa.JSON(), nullable=False),
        sa.Column('technologies', sa.JSON(), nullable=False),
        sa.Column('client_name', sa.String(length=255), nullable=True),
        sa.Column('project_url', sa.String(length=500), nullable=True),
        sa.Column('featured', sa.Boolean(), nullable=False, server_default='0'),
        sa.Column('published', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_projects_slug'), 'projects', ['slug'], unique=True)
    op.create_index(op.f('ix_projects_category'), 'projects', ['category'], unique=False)
    op.create_index(op.f('ix_projects_created_at'), 'projects', ['created_at'], unique=False)

    # project_images
    op.create_table(
        'project_images',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('project_id', sa.String(length=36), nullable=False),
        sa.Column('image_url', sa.String(length=500), nullable=False),
        sa.Column('caption', sa.String(length=255), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )

    # services
    op.create_table(
        'services',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('slug', sa.String(length=100), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('short_description', sa.Text(), nullable=False),
        sa.Column('full_description', sa.Text(), nullable=False),
        sa.Column('features', sa.JSON(), nullable=False),
        sa.Column('deliverables', sa.JSON(), nullable=False),
        sa.Column('icon_name', sa.String(length=100), nullable=False, server_default='Globe'),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_services_slug'), 'services', ['slug'], unique=True)

    # site_settings
    op.create_table(
        'site_settings',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('company_name', sa.String(length=100), nullable=False),
        sa.Column('tagline', sa.String(length=255), nullable=False),
        sa.Column('company_email', sa.String(length=255), nullable=False),
        sa.Column('whatsapp_number', sa.String(length=50), nullable=False),
        sa.Column('social_x', sa.String(length=255), nullable=True),
        sa.Column('social_linkedin', sa.String(length=255), nullable=True),
        sa.Column('social_github', sa.String(length=255), nullable=True),
        sa.Column('website_url', sa.String(length=255), nullable=False),
        sa.Column('seo_title_default', sa.String(length=255), nullable=False),
        sa.Column('seo_description_default', sa.Text(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )

    # audit_logs
    op.create_table(
        'audit_logs',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('user_id', sa.String(length=36), nullable=True),
        sa.Column('action', sa.String(length=100), nullable=False),
        sa.Column('target_type', sa.String(length=100), nullable=False),
        sa.Column('target_id', sa.String(length=100), nullable=True),
        sa.Column('ip_address', sa.String(length=50), nullable=True),
        sa.Column('details', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_audit_logs_created_at'), 'audit_logs', ['created_at'], unique=False)


def downgrade() -> None:
    op.drop_table('audit_logs')
    op.drop_table('site_settings')
    op.drop_table('services')
    op.drop_table('project_images')
    op.drop_table('projects')
    op.drop_table('contact_submissions')
    op.drop_table('users')
