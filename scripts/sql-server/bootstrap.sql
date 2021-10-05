CREATE DATABASE db;
GO
USE db
GO
CREATE TABLE t1 (c1 INT IDENTITY, c2 VARCHAR(50), CONSTRAINT pk PRIMARY KEY(c1))
GO
USE db
GO
EXEC sys.sp_cdc_enable_db
GO
USE db
GO
EXEC sys.sp_cdc_enable_table @source_schema = N'dbo', @source_name = N't1', @role_name = NULL, @filegroup_name = N'PRIMARY'
GO
