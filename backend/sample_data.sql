-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: 305
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'S Chen','123 A','Syo','NY','USA',11111,'stephenchen3@example.com'),(2,'Brian Lee','100 Circle Road','Stony Brook','NY','United States',11794,'a@a.c'),(3,'Brian Lee','100 Circle Road','Stony Brook','CA','United States',11794,'a@a.c'),(11,'ur mum','111 AAA','Asssddddfff','PA','United States',18118,'sc3@example.com'),(44,'a','s','11','AK','United States',1,'a@a.c'),(47,'Stony Brook','SBU','New York','NY','United States',11021,'a@a.b'),(48,'1','1','1','AL','United States',1,'a@a.c'),(49,'CHENNNNNNNNYYYYY','ROTH POND','ROTHHHHHYYYYY','DC','United States',10101,'chennychenchen@p'),(51,'A','A','A','AK','United States',11111,'sc@example.com'),(52,'A','A','A','AK','United States',11111,'test@example.com'),(53,'Brian Lee','11 C St, 2P','AAA','NY','United States',11111,'cse305@a.com');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Clothing'),('Electronics'),('Entertainment'),('Food'),('Health'),('Home'),('Misc.'),('Sports'),('Toys');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('a@a.b','Brian','Lee Jr',33),('a@a.c','Brian','Lee',26),('a@a.c1','','',11),('a@a.c123','a','Lee',16),('a@a.c2','','',12),('a@a.com','a','a',19),('a@a.cxcn','a','a',18),('b@l.com','Brian','Lee',27),('Bikeyli@gmail.co','Bike','all wheel drive',34),('chennychenchen@p','Chenny','Chen Chen',29),('cse305@a.com','Brian','Lee',38),('demotest@a.a','Test','Registration',31),('sc3@example.com','Stephen','Chen',32),('stephenchen3@example.com','Joseph','Kim',3),('test@example.com','TestFN','TestLN',36);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Stephen','wtf?','his mum','Misc.'),(2,'Apple','','Nature','Food'),(3,'Banana','','Nature','Food'),(4,'Brick Phone','A brick that kinda looks like a phone.','My imagination','Electronics'),(5,'Lamp','NULL','Yes','Home'),(6,'Book',NULL,'AaBbCc','Entertainment'),(8,'A single grape','item_desc','item_manufacturer','Food'),(9,'Water','','Nature','Food'),(10,'Soda','a sugary liquid treat','Soda Inc','Food'),(11,'Andy\'s mum','','Andy\'s grandma','Toys'),(12,'Cheerios','sweet like honey and crunchy','Cheerios Inc','Food'),(13,'Cheerios','sweet like honey and crunchy','Cheerios Inc','Food'),(14,'Blanket','warm','Textile Factory','Home'),(15,'Pillow','comfy','Home Goods','Home'),(16,'Frog','frog','mama frog','Food'),(17,'Our Lord and Savior, President Stanley','God bless President Stanley','Mom','Entertainment'),(18,'Tree','green and tall','Mother Nature','Misc.'),(19,'Grass','Green','Nature','Misc.'),(20,'Grass','Green','Nature','Misc.'),(21,'Tiffany','','her mum','Misc.'),(22,'Brian','','his mum','Misc.'),(23,'Teddy Bear','soft and fluffy\nyou can sleep with it at night to feel safe','Make a Bear','Toys'),(24,'Straw','use it to drink liquids ','Straws Inc','Food'),(25,'FInal Exams Blessing','Purchase to get blessed','','Health'),(27,'Coffee','What is keeping me alive this finals week','Starbucks','Food'),(28,'Pancakes','Breakfast option','IHOP','Food'),(29,'Pencil','Writing utensil','Bic','Misc.'),(30,'Paper','writing','Paper Inc','Misc.');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `itemimage`
--

LOCK TABLES `itemimage` WRITE;
/*!40000 ALTER TABLE `itemimage` DISABLE KEYS */;
INSERT INTO `itemimage` VALUES (1,'https://images.plasticplace.com/blog/wp-content/uploads/knot-tied-trash-bag.jpg'),(2,'https://images2.minutemediacdn.com/image/upload/v1555430671/shape/mentalfloss/apple_lead.jpg'),(3,'https://www.seriouseats.com/images/20091008-bruisedbananaphoto.jpg'),(4,'https://i1.wp.com/media.boingboing.net/wp-content/uploads/2018/07/Brick_Bennett.jpg'),(8,'https://iclif.org/wp-content/uploads/2016/12/grape.png'),(9,'https://i.redd.it/4r377kt00ku11.jpg'),(17,'https://upload.wikimedia.org/wikipedia/commons/e/eb/Samuel_L._StanleyPortrait2014.jpg'),(25,''),(27,''),(28,''),(29,''),(30,'');
/*!40000 ALTER TABLE `itemimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'sc@example.com',1,500),(1,'test@example.com',0,100),(1,'th@example.com',0,100),(2,'sc@example.com',1,100),(2,'th@example.com',1,100),(3,'th@example.com',5,100),(4,'sc@example.com',30,700),(4,'th@example.com',0,100),(5,'sc@example.com',10,100),(5,'th@example.com',6,100),(6,'a@a.b',921488,12300),(6,'sc@example.com',100,100),(8,'sc@example.com',7,200),(9,'sc@example.com',17,100),(11,'a@a.b',0,100),(16,'sc@example.com',0,500),(17,'a@a.b',0,1),(25,'a@a.b',18,2500),(27,'sc@example.com',45,500);
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Credit','11111111','2019-04-00',123,1,'sc@example.com'),(2,'Paypal','sc@example.com',NULL,NULL,NULL,'sc@example.com'),(13,'Credit','1','2011-11-00',1,2,'a@a.c'),(14,'Credit','1','2011-11-00',1,2,'a@a.c'),(15,'Credit','1','2011-11-00',1,2,'a@a.c'),(16,'Credit','1','2011-11-00',1,2,'a@a.c'),(17,'Credit','1','2011-11-00',1,2,'a@a.c'),(18,'Credit','1','2011-11-00',1,2,'a@a.c'),(19,'Credit','1','2011-11-00',1,2,'a@a.c'),(20,'Paypal','a@a.com',NULL,NULL,NULL,'a@a.c'),(22,'Paypal','adsfgh@asd',NULL,NULL,NULL,'a@a.b'),(23,'Credit','123','2022-11-00',123,11,'sc3@example.com'),(24,'Debit','00','1990-12-00',7868,2,'a@a.c'),(25,'Gift','9111111111111111','1999-10-00',999,49,'chennychenchen@p'),(28,'Paypal','test@example.com',NULL,NULL,NULL,'test@example.com'),(29,'Credit','213543','2012-12-00',123,53,'cse305@a.com');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `paymenttype`
--

LOCK TABLES `paymenttype` WRITE;
/*!40000 ALTER TABLE `paymenttype` DISABLE KEYS */;
INSERT INTO `paymenttype` VALUES ('Credit'),('Debit'),('Gift'),('Paypal');
/*!40000 ALTER TABLE `paymenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,9,'sc3@example.com','2019-05-05',24385,23,11),(2,10,'a@a.c','2019-05-06',1995,14,3),(3,21,'a@a.c','2019-05-06',2768,13,2),(4,22,'a@a.c','2019-05-06',13795,13,3),(5,14,'a@a.b','2019-05-06',22900,22,47),(6,23,'a@a.c','2019-05-06',24500,13,2),(7,25,'a@a.c','2019-05-06',3400,24,2),(8,28,'chennychenchen@p','2019-05-08',4700,25,49),(9,20,'sc3@example.com','2019-05-09',9590,23,11),(10,30,'sc3@example.com','2019-05-13',9190,23,11),(11,24,'a@a.b','2019-05-13',8305,22,47),(12,35,'test@example.com','2019-05-13',2890,28,52),(13,37,'cse305@a.com','2019-05-13',795,29,53);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (3,5,'Great!','I love it.','sc3@example.com',1,NULL),(4,1,'wtf','this shit sucks','sc3@example.com',4,NULL),(5,1,'eh.','Bananas are ok..','sc3@example.com',3,NULL),(6,4,'!','Bananas are ok..','stephenchen3@example.com',3,NULL),(7,1,'??','This is human trafficking','stephenchen3@example.com',NULL,'sc@example.com'),(8,3,'Great product',':)','a@a.c',1,NULL),(9,5,'I like bricks',':)','a@a.c',4,NULL),(10,1,'trash','TRAAAASH','a@a.b',1,NULL),(11,3,'HydroHomies Rep','RIP WN','a@a.b',9,NULL),(12,5,'Amazing','Best in market','stephenchen3@example.com',1,NULL),(13,5,'I love Stanley','Make SBU great again','a@a.b',17,NULL),(14,5,'Great!','Pretty cheap.','sc3@example.com',NULL,'a@a.b'),(19,1,'Lies','I heard there were pandas in stock >:T i got baited ;-;','chennychenchen@p',NULL,'sc@example.com'),(21,3,'?','I don\'t think this worked :(','a@a.b',25,NULL),(23,5,'Very good','Nutritious beverage','test@example.com',9,NULL),(24,3,'Good','Good','cse305@a.com',9,NULL);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES ('a@a.b','abc'),('a@a.c123','112345'),('a@a.cxcn','2erghn'),('a@a.s','Brian\'s Garage Sale'),('a321@a.c','asdasdczxc'),('cse305@a.com','Store'),('sc@example.com','Stephen\'s Store'),('test@example.com','Test'),('th@example.com','Tiffany\'s Store'),('thseller@example.com','TH\'s Store');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shipcompany`
--

LOCK TABLES `shipcompany` WRITE;
/*!40000 ALTER TABLE `shipcompany` DISABLE KEYS */;
INSERT INTO `shipcompany` VALUES ('FedEx'),('UPS'),('USPS');
/*!40000 ALTER TABLE `shipcompany` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (1,NULL,1,'th@example.com','UPS','Two-Day',NULL),(2,NULL,1,'sc@example.com','UPS','Two-Day',NULL),(3,NULL,1,'a@a.b','UPS','Two-Day',NULL),(4,NULL,2,'sc@example.com','UPS','Two-Day',NULL),(5,NULL,3,'sc@example.com','USPS','Priority Express',NULL),(6,NULL,4,'a@a.b','UPS','Two-Day',NULL),(7,NULL,5,'sc@example.com','FedEx','Standard Overnight',NULL),(8,NULL,5,'th@example.com','FedEx','Standard Overnight',NULL),(9,NULL,5,'a@a.b','FedEx','Standard Overnight',NULL),(10,NULL,6,'sc@example.com','FedEx','Standard Overnight',NULL),(11,NULL,6,'a@a.b','FedEx','Standard Overnight',NULL),(12,NULL,7,'sc@example.com','FedEx','Standard Overnight',NULL),(13,NULL,8,'sc@example.com','FedEx','Standard Overnight',NULL),(14,NULL,9,'sc@example.com','USPS','Priority Mail',NULL),(15,NULL,9,'a@a.b','USPS','Priority Mail',NULL),(16,NULL,10,'sc@example.com','UPS','Two-Day',NULL),(17,NULL,10,'a@a.b','UPS','Two-Day',NULL),(18,NULL,11,'a@a.b','FedEx','Standard Overnight',NULL),(19,NULL,12,'th@example.com','USPS','Priority Mail',NULL),(20,NULL,12,'sc@example.com','USPS','Priority Mail',NULL),(21,NULL,13,'sc@example.com','USPS','Priority Mail',NULL);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shiptype`
--

LOCK TABLES `shiptype` WRITE;
/*!40000 ALTER TABLE `shiptype` DISABLE KEYS */;
INSERT INTO `shiptype` VALUES ('FedEx','Standard Overnight',3300),('UPS','Two-Day',1495),('USPS','Priority Express',2268),('USPS','Priority Mail',695);
/*!40000 ALTER TABLE `shiptype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
INSERT INTO `shoppingcart` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(14),(16),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38);
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shoppingcartcontents`
--

LOCK TABLES `shoppingcartcontents` WRITE;
/*!40000 ALTER TABLE `shoppingcartcontents` DISABLE KEYS */;
INSERT INTO `shoppingcartcontents` VALUES (9,1,'th@example.com',1),(9,4,'sc@example.com',1),(9,6,'a@a.b',1),(9,9,'sc@example.com',48),(10,2,'sc@example.com',1),(14,2,'sc@example.com',3),(14,3,'th@example.com',1),(14,6,'a@a.b',1),(20,2,'sc@example.com',18),(20,5,'sc@example.com',3),(20,9,'sc@example.com',10),(20,11,'a@a.b',1),(20,16,'sc@example.com',10),(21,2,'sc@example.com',1),(22,6,'a@a.b',1),(23,2,'sc@example.com',20),(23,4,'sc@example.com',3),(23,6,'a@a.b',1),(24,17,'a@a.b',5),(24,25,'a@a.b',2),(28,9,'sc@example.com',14),(30,2,'sc@example.com',12),(30,25,'a@a.b',1),(30,27,'sc@example.com',5),(32,4,'sc@example.com',1),(32,5,'th@example.com',5),(32,6,'a@a.b',10),(32,9,'sc@example.com',12),(34,25,'a@a.b',1),(35,4,'th@example.com',1),(35,5,'th@example.com',4),(35,9,'sc@example.com',10),(37,9,'sc@example.com',1);
/*!40000 ALTER TABLE `shoppingcartcontents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('',''),('a@a.b','123'),('a@a.c','123'),('a@a.c1','123'),('a@a.c12','123'),('a@a.c123','123'),('a@a.c2','123'),('a@a.c21','123'),('a@a.c3','123'),('a@a.c4','123'),('a@a.com','123'),('a@a.cxcn','123'),('a@a.s','123'),('a123@a.c','123'),('a321@a.c','123'),('b@b.com','123'),('b@l.com','123'),('Bikeyli@gmail.co','bikerman'),('chennychenchen@p','poptart'),('cse305@a.com','123'),('demotest@a.a','123'),('postbodytest@example.com','hello'),('sc@example.com','hello'),('sc3@example.com','hello'),('stephenchen@example.com','hello'),('stephenchen1@example.com','hello'),('stephenchen2@example.com','hello'),('stephenchen3@example.com','hello'),('stephenchen4@example.com','hello'),('test@example.com','hello'),('th@example.com','imalwayshungry'),('th2@example.com','123'),('thseller@example.com','hello'),('tiffany@gmail.com','abc123'),('tiffany2@gmail.com','abc123'),('tiffanyhe@gmail.com','youcanneverguessthis'),('tt@t.com','a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-09 15:09:39
