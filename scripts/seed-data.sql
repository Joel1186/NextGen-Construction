-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (name, email, company, password) VALUES
('John Doe', 'john@example.com', 'Doe Construction', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm'),
('Jane Smith', 'jane@example.com', 'Smith Builders', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm')
ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (user_id, name, description, client_name, client_email, address, status, estimated_value, start_date, end_date) VALUES
(1, 'Kitchen Renovation', 'Complete kitchen remodel with new cabinets and appliances', 'Johnson Family', 'johnson@email.com', '123 Main St, Anytown, USA', 'active', 15000.00, '2024-01-15', '2024-02-15'),
(1, 'Roof Replacement', 'Full roof replacement with new shingles', 'Smith Residence', 'smith@email.com', '456 Oak Ave, Anytown, USA', 'pending', 8500.00, '2024-02-01', '2024-02-20'),
(1, 'Bathroom Remodel', 'Master bathroom renovation', 'Davis Home', 'davis@email.com', '789 Pine St, Anytown, USA', 'completed', 12000.00, '2024-01-01', '2024-01-30'),
(2, 'Deck Construction', 'New wooden deck construction', 'Wilson Property', 'wilson@email.com', '321 Elm St, Anytown, USA', 'active', 6500.00, '2024-02-10', '2024-02-25');

-- Insert sample estimates
INSERT INTO estimates (user_id, project_id, client_name, client_email, job_type, description, estimated_cost, status, valid_until) VALUES
(1, 1, 'Johnson Family', 'johnson@email.com', 'Kitchen Renovation', 'Complete kitchen remodel', 15000.00, 'approved', '2024-03-01'),
(1, 2, 'Smith Residence', 'smith@email.com', 'Roof Replacement', 'Full roof replacement', 8500.00, 'pending', '2024-03-15'),
(1, 3, 'Davis Home', 'davis@email.com', 'Bathroom Remodel', 'Master bathroom renovation', 12000.00, 'approved', '2024-02-28'),
(2, 4, 'Wilson Property', 'wilson@email.com', 'Deck Construction', 'New wooden deck', 6500.00, 'pending', '2024-03-10');

-- Insert sample estimate items
INSERT INTO estimate_items (estimate_id, description, quantity, unit_price, total_price) VALUES
-- Kitchen Renovation items
(1, 'Kitchen Cabinets', 1, 8000.00, 8000.00),
(1, 'Countertops', 1, 3000.00, 3000.00),
(1, 'Labor', 40, 50.00, 2000.00),
(1, 'Appliances', 1, 2000.00, 2000.00),

-- Roof Replacement items
(2, 'Shingles', 30, 150.00, 4500.00),
(2, 'Underlayment', 1, 800.00, 800.00),
(2, 'Labor', 60, 45.00, 2700.00),
(2, 'Materials', 1, 500.00, 500.00),

-- Bathroom Remodel items
(3, 'Tiles', 1, 2000.00, 2000.00),
(3, 'Fixtures', 1, 3000.00, 3000.00),
(3, 'Vanity', 1, 1500.00, 1500.00),
(3, 'Labor', 110, 50.00, 5500.00),

-- Deck Construction items
(4, 'Lumber', 1, 3000.00, 3000.00),
(4, 'Hardware', 1, 500.00, 500.00),
(4, 'Labor', 60, 50.00, 3000.00);
