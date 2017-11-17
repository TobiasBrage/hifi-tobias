-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 17, 2017 at 09:03 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hifi`
--
CREATE DATABASE IF NOT EXISTS `hifi` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hifi`;

-- --------------------------------------------------------

--
-- Table structure for table `bruger`
--

CREATE TABLE `bruger` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `brugernavn` varchar(55) NOT NULL,
  `kodeord` varchar(255) NOT NULL,
  `fk_tilladelse` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bruger`
--

INSERT INTO `bruger` (`id`, `navn`, `mail`, `brugernavn`, `kodeord`, `fk_tilladelse`) VALUES
(5, 'superadmin', 'superadmin@mail.com', 'superadmin', '17c4520f6cfd1ab53d8745e84681eb49', 3),
(24, 'admin', 'admin@mail.com', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `navn`) VALUES
(1, 'CD Afspillere'),
(2, 'DVD Afspillere'),
(3, 'Effektforstærkere'),
(4, 'Forforstærkere'),
(5, 'Højtalere'),
(6, 'Int. Forstærkere'),
(7, 'Pladespillere'),
(8, 'Rørforstærkere'),
(12, 'DAB Radio');

-- --------------------------------------------------------

--
-- Table structure for table `kontakt`
--

CREATE TABLE `kontakt` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `mail` varchar(55) NOT NULL,
  `besked` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kontakt`
--

INSERT INTO `kontakt` (`id`, `navn`, `mail`, `besked`) VALUES
(2, 'user', 'user@mail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
(3, 'user 1', 'user1@mail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

-- --------------------------------------------------------

--
-- Table structure for table `produkter`
--

CREATE TABLE `produkter` (
  `id` int(11) NOT NULL,
  `varenr` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `billede` varchar(55) NOT NULL,
  `beskrivelse` char(255) NOT NULL,
  `fk_kategori` int(11) NOT NULL,
  `pris` decimal(6,2) NOT NULL,
  `beholdning` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `produkter`
--

INSERT INTO `produkter` (`id`, `varenr`, `navn`, `billede`, `beskrivelse`, `fk_kategori`, `pris`, `beholdning`) VALUES
(1, 1001, 'Creek Classic', 'creek_Classic_CD.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincit ac imperdiet quis, porttitor in risus.', 1, '599.95', 5),
(2, 1002, 'Creek Destiny', 'creek_destinyamp.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincit ac imperdiet quis, porttitor in risus.', 1, '799.95', 2),
(3, 1003, 'Creek Evo', 'creek_evo_cd.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam.', 1, '399.95', 4),
(4, 1004, 'Exposure 2010S', 'exposure_2010S.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 2, '399.95', 3),
(5, 1005, 'Parasound D200', 'manley_neoclassic300b.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 2, '499.95', 6),
(6, 1006, 'Parasound Halod 3', 'parasound_halod3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 2, '799.95', 3),
(7, 1007, 'Manley Mahi', 'manley_mahi.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 3, '1299.95', 2),
(8, 1008, 'Manley Neoclassic 300B', 'manley_neoclassic300b.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 3, '1499.95', 1),
(9, 1009, 'Manley Snapper', 'manley_snapper.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 3, '1199.95', 2),
(10, 1010, 'Parasound Haloa 23', 'parasound_haloa23.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 3, '499.95', 6),
(11, 1011, 'Creek OBH 22 Passive', 'Creek_OBH_22_Passive_Preamp.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 4, '299.95', 6),
(12, 1012, 'Parasound Classic 7100', 'parasound_classic7100.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 4, '399.95', 0),
(13, 1013, 'Parasound Halop 3', 'parasound_halop3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 4, '699.95', 3),
(14, 1014, 'Boesendorfer Vcs Wall', 'boesendorfer_vcs_wall.gif', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 5, '3.00', 400),
(15, 1015, 'Epos M5', 'epos_m5.gif', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 5, '499.95', 6),
(16, 1016, 'Harbeth Hl7es2', 'harbeth_hl7es2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 5, '899.95', 2),
(17, 1017, 'Harbeth Monitor30', 'harbeth_monitor30.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 5, '799.95', 6),
(18, 1018, 'Harbeth P3es2', 'harbeth_p3es2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 5, '399.95', 3),
(19, 1019, 'Creek A50I', 'creek_a50I.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 6, '499.95', 6),
(20, 1020, 'Creek Classic 5350SE', 'creek_classic5350SE.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 6, '399.95', 3),
(21, 1021, 'Creek Destinyamp', 'creek_destinyamp.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 6, '599.95', 3),
(22, 1022, 'Manley Snapper', 'manley_snapper_2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 6, '1099.95', 2),
(23, 1023, 'Manley Stingray', 'Manley_Stingray.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 6, '1399.95', 4),
(24, 1024, 'Pro Ject Debut Blue', 'Pro_ject_Debut_3_bl.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 7, '499.95', 3),
(25, 1025, 'Pro Ject Debut Red', 'Pro_ject_Debut_III_red_1.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 7, '499.95', 5),
(26, 1026, 'Pro Ject Debut Yellow', 'Pro_ject_Debut_III_yellow_1.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 7, '499.95', 2),
(27, 1027, 'Pro Ject Rpm 5', 'Pro_ject_rpm_5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 7, '799.95', 6),
(28, 1028, 'Jolida JD102B', 'jolida_JD102b.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 8, '1299.95', 2),
(29, 1029, 'Jolida JD202A', 'jolida_JD202a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 8, '1399.95', 1),
(30, 1030, 'Jolida JD300B', 'jolida_JD300b.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium finibus metus eget aliquam. Morbi vitae nisi velit. Proin sit amet pharetra metus, nec semper ante. Sed nibh quam, tincidunt ac imperdiet quis, porttitor in risus.', 8, '1499.95', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tilladelse`
--

CREATE TABLE `tilladelse` (
  `id` int(11) NOT NULL,
  `navn` varchar(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tilladelse`
--

INSERT INTO `tilladelse` (`id`, `navn`) VALUES
(1, 'admin'),
(3, 'superadmin');

-- --------------------------------------------------------

--
-- Table structure for table `userToken`
--

CREATE TABLE `userToken` (
  `id` int(11) NOT NULL,
  `sessionName` varchar(64) NOT NULL,
  `userId` int(11) NOT NULL,
  `created` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userToken`
--

INSERT INTO `userToken` (`id`, `sessionName`, `userId`, `created`) VALUES
(158, '1510311231659hi01yvj2roltio5t9op72w5m7cbbpd1iwnvlh725s7hp8m4q', 5, NULL),
(168, '1510903508339cbczht7tfwk0cfzs789oq9cj626z7odext9i5hwial3chxg9', 24, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bruger`
--
ALTER TABLE `bruger`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brugernavn` (`brugernavn`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `fk_tilladelse` (`fk_tilladelse`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kontakt`
--
ALTER TABLE `kontakt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produkter`
--
ALTER TABLE `produkter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `varenr` (`varenr`),
  ADD KEY `fk_kategori` (`fk_kategori`);

--
-- Indexes for table `tilladelse`
--
ALTER TABLE `tilladelse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userToken`
--
ALTER TABLE `userToken`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bruger`
--
ALTER TABLE `bruger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `kontakt`
--
ALTER TABLE `kontakt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `produkter`
--
ALTER TABLE `produkter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `tilladelse`
--
ALTER TABLE `tilladelse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `userToken`
--
ALTER TABLE `userToken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bruger`
--
ALTER TABLE `bruger`
  ADD CONSTRAINT `bruger_ibfk_1` FOREIGN KEY (`fk_tilladelse`) REFERENCES `tilladelse` (`id`);

--
-- Constraints for table `produkter`
--
ALTER TABLE `produkter`
  ADD CONSTRAINT `produkter_ibfk_1` FOREIGN KEY (`fk_kategori`) REFERENCES `kategori` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
