-- MySQL Script generated by MySQL Workbench
-- lun 29 jun 2015 20:14:44 ART
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema db_marketPlace
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_marketPlace
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_marketPlace` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `db_marketPlace` ;

-- -----------------------------------------------------
-- Table `db_marketPlace`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_marketPlace`.`Clientes` (
  `idClientes` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `doc` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idClientes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_marketPlace`.`Factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_marketPlace`.`Factura` (
  `idfactura` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `Clientes_idClientes` INT NOT NULL,
  PRIMARY KEY (`idfactura`),
  INDEX `fk_Factura_Clientes1_idx` (`Clientes_idClientes` ASC),
  CONSTRAINT `fk_Factura_Clientes1`
    FOREIGN KEY (`Clientes_idClientes`)
    REFERENCES `db_marketPlace`.`Clientes` (`idClientes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_marketPlace`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_marketPlace`.`Producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` REAL NOT NULL,
  `proveedor` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_marketPlace`.`Detalle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_marketPlace`.`Detalle` (
  `idDetalle` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `total` REAL NOT NULL,
  `Factura_idfactura` INT NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  PRIMARY KEY (`idDetalle`),
  INDEX `fk_Detalle_Factura1_idx` (`Factura_idfactura` ASC),
  INDEX `fk_Detalle_Producto1_idx` (`Producto_idProducto` ASC),
  CONSTRAINT `fk_Detalle_Factura1`
    FOREIGN KEY (`Factura_idfactura`)
    REFERENCES `db_marketPlace`.`Factura` (`idfactura`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Detalle_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `db_marketPlace`.`Producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
