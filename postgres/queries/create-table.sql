CREATE TABLE TEST_TABLE_ONE (
        id INT PRIMARY KEY,
        field_table_one VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE TEST_TABLE_TWO (
        id INT PRIMARY KEY,
        field_table_two VARCHAR(50),
        source_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE FUNCTION update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
$$;

CREATE TRIGGER t1_updated_at_modtime BEFORE UPDATE ON TEST_TABLE_ONE FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER t1_updated_at_modtime BEFORE UPDATE ON TEST_TABLE_TWO FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (1, 'field_table_one1');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (2, 'field_table_one2');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (3, 'field_table_one3');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (4, 'field_table_one4');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (5, 'field_table_one5');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (6, 'field_table_one6');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (7, 'field_table_one7');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (8, 'field_table_one8');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (9, 'field_table_one9');
INSERT INTO TEST_TABLE_ONE (id, field_table_one) VALUES (10, 'field_table_one10');

INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (1, 'field_table_two1', 1);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (2, 'field_table_two2', 2);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (3, 'field_table_two3', 3);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (4, 'field_table_two4', 4);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (5, 'field_table_two5', 5);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (6, 'field_table_two6', 6);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (7, 'field_table_two7', 7);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (8, 'field_table_two8', 8);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (9, 'field_table_two9', 9);
INSERT INTO TEST_TABLE_TWO (id, field_table_two, source_id) VALUES (10, 'field_table_two10', 10);