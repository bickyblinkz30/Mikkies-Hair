-- Settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default settings
INSERT INTO settings (key, value)
VALUES ('whatsapp_number', '447123456789')
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

-- Only authenticated admins can manage settings
CREATE POLICY "Only admins can manage settings" ON settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('stylist', 'admin'))
  );

-- Trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
