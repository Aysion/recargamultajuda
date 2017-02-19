
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `customer` (
  `id` varchar(32) NOT NULL,
  `affiliate` varchar(32) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `operadora` varchar(8) DEFAULT NULL,
  `celular` varchar(18) DEFAULT NULL,
  `cpfcnpj` varchar(16) DEFAULT NULL,
  `rg` varchar(16) DEFAULT NULL,
  `dtnasc` date DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `estadoCivil` varchar(28) DEFAULT NULL,
  `nDependente` int(11) DEFAULT NULL,
  `endereco` varchar(128) DEFAULT NULL,
  `numero` varchar(16) DEFAULT NULL,
  `bairro` varchar(64) DEFAULT NULL,
  `complemento` text,
  `cidade` varchar(128) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `uf` varchar(4) DEFAULT NULL,
  `banco` varchar(64) DEFAULT NULL,
  `agencia` varchar(32) DEFAULT NULL,
  `tipoConta` varchar(1) DEFAULT NULL,
  `nConta` varchar(64) DEFAULT NULL,
  `digito` varchar(16) DEFAULT NULL,
  `operacao` varchar(64) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `createon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` varchar(32) DEFAULT '1',
  `confirmed` int(1) DEFAULT '0',
  `madeRecharge` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `customer_ibfk_1` (`affiliate`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `receipt` (
  `id` varchar(32) NOT NULL,
  `fileExtension` varchar(5) DEFAULT NULL,
  `body` longblob,
  `whats` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
