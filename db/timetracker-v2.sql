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
/*!40103 SET TIME_ZONE='+01:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `password` char(60) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Insert data for table `worker`
--

INSERT INTO `worker` (`name`, `lastname`, `email`, `password`, `role`) VALUES
('test', 'test', 'test@gmail.com', 'test', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `delo`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work` (
  `workID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `project` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `workplace` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`workID`),
  KEY `name` (`name`),
  KEY `project` (`project`),
  KEY `workplace` (`workplace`),
  CONSTRAINT `work_ibfk_1` FOREIGN KEY (`name`) REFERENCES `worker` (`name`) ON DELETE CASCADE,
  CONSTRAINT `work_ibfk_2` FOREIGN KEY (`project`) REFERENCES `project` (`name`) ON DELETE CASCADE,
  CONSTRAINT `work_ibfk_3` FOREIGN KEY (`workplace`) REFERENCES `workplace` (`name`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Insert data for table `work`
--

INSERT INTO `work` (`workID`, `name`, `project`, `workplace`, `start_time`, `end_time`, `time`) VALUES
(1, 'Test', 'Test', 'Test', '2025-03-15 06:30:45', '2025-03-15 15:15:00', '08:44:15');

--
-- Triggers `work`
--
DELIMITER $$
CREATE TRIGGER `datetime_handler_add` BEFORE INSERT ON `work` FOR EACH ROW BEGIN
    SET NEW.time = TIMEDIFF(NEW.end_time, NEW.start_time);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `datetime_handler_update` BEFORE UPDATE ON `work` FOR EACH ROW BEGIN
    SET NEW.time = TIMEDIFF(NEW.end_time, NEW.start_time);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `subtract_time` BEFORE DELETE ON `work` FOR EACH ROW BEGIN
    UPDATE workplace SET time = time - OLD.time WHERE name = OLD.workplace;
    UPDATE project SET time = time - OLD.time WHERE name = OLD.project;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `add_time` BEFORE INSERT ON `work` FOR EACH ROW BEGIN
    UPDATE workplace SET time = time + NEW.time WHERE name = NEW.workplace;
    UPDATE project SET time = time + NEW.time WHERE name = NEW.project;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_time` BEFORE UPDATE ON `work` FOR EACH ROW BEGIN
	UPDATE workplace SET time = time - OLD.time WHERE name = OLD.workplace;
	UPDATE workplace SET time = time + NEW.time WHERE name = NEW.workplace;

	UPDATE project SET time = time - OLD.time WHERE name = OLD.project;
	UPDATE project SET time = time + NEW.time WHERE name = NEW.project;
END
$$
DELIMITER ;

-- --------------------------------------------------------
--
-- Table structure for table `workplace`
--

DROP TABLE IF EXISTS `workplace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workplace` (
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `time` time DEFAULT '00:00:00',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Insert data for table `workplace`
--

INSERT INTO `workplace` (`name`) VALUES
('test');

-- --------------------------------------------------------
--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `time` time DEFAULT '00:00:00',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Insert data for table `workplace`
--

INSERT INTO `project` (`name`) VALUES
('test');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

