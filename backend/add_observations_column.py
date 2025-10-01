#!/usr/bin/env python3
"""
Migration script to add observations_completed column to concrete_test table
Run this once to fix the database schema
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()

# Get database URL
database_url = os.getenv('DATABASE_URL') or "postgresql://neondb_owner:npg_eHZv0ncD8irC@ep-muddy-pond-a6nccqdf.us-west-2.aws.neon.tech/neondb?sslmode=require"

def add_observations_column():
    """Add observations_completed column to concrete_test table if it doesn't exist"""
    try:
        engine = create_engine(database_url)
        
        with engine.connect() as conn:
            # Check if column exists
            check_query = text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name='concrete_test' 
                AND column_name='observations_completed'
            """)
            
            result = conn.execute(check_query)
            column_exists = result.fetchone()
            
            if column_exists:
                print("✅ Column 'observations_completed' already exists in concrete_test table")
                return
            
            # Add the column
            alter_query = text("""
                ALTER TABLE concrete_test 
                ADD COLUMN observations_completed BOOLEAN DEFAULT FALSE
            """)
            
            conn.execute(alter_query)
            conn.commit()
            
            print("✅ Successfully added 'observations_completed' column to concrete_test table")
            
    except Exception as e:
        print(f"❌ Error adding column: {e}")
        raise

if __name__ == "__main__":
    print("Adding observations_completed column to concrete_test table...")
    add_observations_column()
    print("Migration complete!")

