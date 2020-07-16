SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- CREATE SCHEMA

CREATE SCHEMA IF NOT EXISTS `meetings_db` DEFAULT CHARACTER SET utf8 ;
USE `meetings_db` ;

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS `meetings_db`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `users_name` VARCHAR(100) NOT NULL,
  `users_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `meetings_db`.`meeting` (
  `idmeeting` INT NOT NULL AUTO_INCREMENT,
  `meeting_name` VARCHAR(100) NOT NULL,
  `meeting_date` DATETIME NOT NULL,
  `meeting_description` VARCHAR(100) NULL,
  PRIMARY KEY (`idmeeting`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `meetings_db`.`meeting_has_user` (
  `users_idusers` INT NOT NULL,
  `meeting_idmeeting` INT NOT NULL,
  INDEX `fk_meeting_has_user_users_idx` (`users_idusers` ASC) VISIBLE,
  INDEX `fk_meeting_has_user_meeting1_idx` (`meeting_idmeeting` ASC) VISIBLE,
  CONSTRAINT `fk_meeting_has_user_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `meetings_db`.`users` (`idusers`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_meeting_has_user_meeting1`
    FOREIGN KEY (`meeting_idmeeting`)
    REFERENCES `meetings_db`.`meeting` (`idmeeting`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- SET VALUES TO TABLES

INSERT INTO meetings_db.meeting (meeting_name, meeting_date, meeting_description)
VALUES ('Новогодний корпоратив', '2020-12-31 20:00:00', 'Встретим новый год'),
('Презентация Apple', '2021-06-30 18:30:00', 'Новые продукты'),
('Вечеринка', '2020-10-10 23:00:00', 'Проходит у Джоша');

INSERT INTO meetings_db.users (users_name, users_email)
VALUES ('Николай Иронов', 'ironov@rambler.ru'),
('Владислав Легков', 'legkovv@mail.ru'),
('Илон Маск', 'mask@tesla.com'),
('Бертрам Гилфойл', 'gilfoyle@piedpiped.com');

INSERT INTO meetings_db.meeting_has_user (users_idusers, meeting_idmeeting)
VALUES (1,2);

INSERT INTO meetings_db.meeting_has_user (users_idusers, meeting_idmeeting)
VALUES (2,1);

INSERT INTO meetings_db.meeting_has_user (users_idusers, meeting_idmeeting)
VALUES (1,3)


