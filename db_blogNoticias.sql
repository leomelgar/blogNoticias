SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `db_BlogNoticias` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `db_BlogNoticias` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_BlogNoticias`.`user` (
  `iduser` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_BlogNoticias`.`region` (
  `idregion` INT NOT NULL,
  `location` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idregion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_BlogNoticias`.`article` (
  `idarticle` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `user_iduser` INT NOT NULL,
  `region_idregion` INT NOT NULL,
  PRIMARY KEY (`idarticle`, `user_iduser`, `region_idregion`),
  INDEX `fk_article_user_idx` (`user_iduser` ASC),
  INDEX `fk_article_region1_idx` (`region_idregion` ASC),
  CONSTRAINT `fk_article_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_BlogNoticias`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_region1`
    FOREIGN KEY (`region_idregion`)
    REFERENCES `db_BlogNoticias`.`region` (`idregion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_BlogNoticias`.`categoria` (
  `idcategoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`article_has_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_BlogNoticias`.`article_has_categoria` (
  `article_idarticle` INT NOT NULL,
  `article_user_iduser` INT NOT NULL,
  `article_region_idregion` INT NOT NULL,
  `categoria_idcategoria` INT NOT NULL,
  PRIMARY KEY (`article_idarticle`, `article_user_iduser`, `article_region_idregion`, `categoria_idcategoria`),
  INDEX `fk_article_has_categoria_categoria1_idx` (`categoria_idcategoria` ASC),
  INDEX `fk_article_has_categoria_article1_idx` (`article_idarticle` ASC, `article_user_iduser` ASC, `article_region_idregion` ASC),
  CONSTRAINT `fk_article_has_categoria_article1`
    FOREIGN KEY (`article_idarticle` , `article_user_iduser` , `article_region_idregion`)
    REFERENCES `db_BlogNoticias`.`article` (`idarticle` , `user_iduser` , `region_idregion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_has_categoria_categoria1`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `db_BlogNoticias`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
