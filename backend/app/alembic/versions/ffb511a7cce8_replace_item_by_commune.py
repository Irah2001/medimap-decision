"""Replace Item by Commune

Revision ID: ffb511a7cce8
Revises: 1a31ce608336
Create Date: 2025-05-06 08:35:12.504873

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'ffb511a7cce8'
down_revision = '1a31ce608336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('commune',
    sa.Column('nom', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
    sa.Column('code_postal', sa.Integer(), nullable=False),
    sa.Column('densite_pop', sa.Float(), nullable=True),
    sa.Column('place_camping_hotel', sa.Float(), nullable=True),
    sa.Column('nombre_medecin', sa.Integer(), nullable=True),
    sa.Column('nombre_intervention', sa.Integer(), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('nombre_habitants', sa.Integer(), nullable=False),
    sa.Column('code_insee', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('code_insee')
    )
    op.drop_table('item')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('item',
    sa.Column('description', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('title', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('owner_id', sa.UUID(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], name='item_owner_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='item_pkey')
    )
    op.drop_table('commune')
    # ### end Alembic commands ###