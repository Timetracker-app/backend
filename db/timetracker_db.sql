-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: timetracker
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `delavec`
--

DROP TABLE IF EXISTS `delavec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delavec` (
  `ime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `priimek` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `geslo` char(60) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ime`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delo`
--

DROP TABLE IF EXISTS `delo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delo` (
  `IDdela` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `projekt` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `stroj` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `zacetni_cas` datetime NOT NULL,
  `koncni_cas` datetime NOT NULL,
  PRIMARY KEY (`IDdela`),
  KEY `ime` (`ime`),
  KEY `projekt` (`projekt`),
  KEY `stroj` (`stroj`),
  CONSTRAINT `delo_ibfk_1` FOREIGN KEY (`ime`) REFERENCES `delavec` (`ime`) ON DELETE CASCADE,
  CONSTRAINT `delo_ibfk_2` FOREIGN KEY (`projekt`) REFERENCES `narocilo` (`projekt`) ON DELETE CASCADE,
  CONSTRAINT `delo_ibfk_3` FOREIGN KEY (`stroj`) REFERENCES `delovno_mesto` (`stroj`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delovno_mesto`
--

DROP TABLE IF EXISTS `delovno_mesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delovno_mesto` (
  `stroj` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `cas` time DEFAULT '00:00:00',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`stroj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `narocilo`
--

DROP TABLE IF EXISTS `narocilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `narocilo` (
  `projekt` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `cas` time DEFAULT '00:00:00',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`projekt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-15 14:10:10
