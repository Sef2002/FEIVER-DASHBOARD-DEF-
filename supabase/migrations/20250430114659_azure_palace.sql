/*
  # Create appointments table for barbershop booking system

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key) - Unique identifier for each appointment
      - `service_id` (uuid) - Reference to the service being booked
      - `barber_id` (uuid) - Reference to the barber providing the service
      - `start_time` (timestamptz) - When the appointment starts
      - `duration_min` (integer) - Duration in minutes
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Functions and Triggers
    - Add trigger to automatically update `updated_at` timestamp
    - Enable real-time capabilities for live updates

  3. Security
    - Enable RLS on appointments table
    - Add policies for authenticated users to manage their appointments
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL,
  barber_id UUID NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  duration_min INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the update function
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for appointment management
CREATE POLICY "Enable read access for authenticated users"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Enable real-time subscriptions for this table
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;