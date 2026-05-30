-- Add new consultation statuses to appointments table
ALTER TABLE appointments 
  DROP CONSTRAINT IF EXISTS appointments_status_check CASCADE;

ALTER TABLE appointments 
  ADD CONSTRAINT appointments_status_check 
  CHECK (status IN ('pending_consultation', 'consultation_in_progress', 'confirmed', 'declined', 'cancelled', 'completed', 'pending'));

-- Add decline_reason column
ALTER TABLE appointments 
  ADD COLUMN IF NOT EXISTS decline_reason TEXT;

-- Add consultation_timeline column (JSONB array of events)
ALTER TABLE appointments 
  ADD COLUMN IF NOT EXISTS consultation_timeline JSONB DEFAULT '[]'::jsonb;

-- Update notification types to include consultation
ALTER TABLE notifications 
  DROP CONSTRAINT IF EXISTS notifications_type_check CASCADE;

ALTER TABLE notifications 
  ADD CONSTRAINT notifications_type_check 
  CHECK (type IN ('booking_confirmed', 'booking_pending', 'booking_declined', 'reminder', 'consultation_requested', 'consultation_confirmed', 'consultation_declined'));

-- Index for consultation statuses
CREATE INDEX IF NOT EXISTS idx_appointments_consultation_status ON appointments(status) WHERE status IN ('pending_consultation', 'consultation_in_progress');
