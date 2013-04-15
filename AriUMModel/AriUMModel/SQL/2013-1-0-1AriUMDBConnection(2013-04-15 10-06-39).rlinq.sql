-- add column for field _year
ALTER TABLE `Invoice` ADD COLUMN `yr` integer NULL
;

UPDATE `Invoice` SET `yr` = 0
;

ALTER TABLE `Invoice` CHANGE COLUMN `yr` `yr` integer NOT NULL
;

