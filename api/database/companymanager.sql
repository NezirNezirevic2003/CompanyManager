-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 16 mrt 2022 om 10:05
-- Serverversie: 10.4.14-MariaDB
-- PHP-versie: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `companymanager`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `department`
--

CREATE TABLE `department` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geÃ«xporteerd voor tabel `department`
--

INSERT INTO `department` (`id`, `name`, `description`) VALUES
(3, 'IT', 'Informatie en Technologie'),
(4, 'Finance', 'Financiele zaken');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `dateOfJoining` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `salary` varchar(15) NOT NULL,
  `phonenumber` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geÃ«xporteerd voor tabel `employee`
--

INSERT INTO `employee` (`id`, `firstname`, `lastname`, `email`, `dateOfJoining`, `status`, `salary`, `phonenumber`) VALUES
(1, 'Nezir', 'Nezirevic', 'nezirnezirevic310@gmail.com', '2022-02-01', 'internship', '1200', '0612345678'),
(3, 'Mohammed', 'Samadov', 'samadov1@gmail.com', '2022-03-01', 'internship', '1000', '068654456'),
(4, 'Nadir', 'md', 'nadi@gmail.com', '2022-03-19', 'internship', '2300', '061234567'),
(5, 'Max', 'van Dongen', 'max@gmail.com', '2022-03-09', 'fulltime', '1200', '0612345678'),
(7, 'Jim', 'van Vliet', '--_____', '2021-02-01', 'fulltime', '1200', '06541234568');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phonenumber` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geÃ«xporteerd voor tabel `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `phonenumber`) VALUES
(3, 'undefined', 'nezir123', 'nezir123', 'nezirnezirevic310@gmail.com', '$2b$10$.CRc2ZrcPytOJDkMZGynqe/dfhMc53ZPiURvy4YyhsKUu3okEddpG', '0612345678'),
(4, 'undefined', 'nezir123', 'nezir123', 'admin@example.com', '$2b$10$KxAnaOgelzCyVpNWIDvyTO2LXBOPef4GFQmlPfzlwbk68JbcCYnLa', '06123456789'),
(5, 'undefined', 'nezir123', 'nezir123', '209646@edu.ozhw.nl', '$2b$10$IjnByQZ4pD6fyjlZ/.6Uq.tFeeAkHKT54ZMgWRLE8BSZa1PHvOOjW', '0612345678'),
(6, 'undefined', 'nezir123', 'nezir123', '2096496@edu.ozhw.nl', '$2b$10$AzwVkFJWQOMWUoXUUzpVm.MZURK6e46B3kI4./SeQq2oeYGsVqbQe', '061234567'),
(7, 'undefined', 'nezir123', 'nezir123', 'klix@gmail.com', '$2b$10$CWbV9KtAAJGKw0TKEjskJOnDjvMbx.m9tSpH7FLgz6Dp7rWWyJTBO', '0612345678'),
(8, 'undefined', 'nezir123', 'nezir123', '12@gmail.com', '$2b$10$oMKRN7m18UqZAbQskdqYpuu0/E5kOSFYFRmrWl8fv5e7cKvkGJ2AS', '0612345678'),
(9, 'undefined', 'nezir123', 'nezir123', 'nezir123@gmail.com', '$2b$10$wZxLSLA3qdP0.lgYMGaUVOHuIbdoUdEK6W1Fxaf9c.SQAdnu086Qm', '062345678'),
(10, 'undefined', 'nezir123', 'nezir123', '20911646@edu.ozhw.nl', '$2b$10$3NnBSF6gjpDF7c6rnPpOkeZQwvTsKNrfdPZYtPtEUSs25fWEB2I2a', '061245678'),
(11, 'undefined', '123456', '123456', 'nezir1239@gmail.com', '$2b$10$MPRTLYlHIxxHNrtpeC3p.e0w6T7p4zf7GYug52QRcIJ13tvM8jWYG', '06123456789'),
(12, 'undefined', 'nezir123', 'nezir123', '12111@gmail.com', '$2b$10$55LrPJUDpSMk3pKZH7ro..AUiNPjQ4MvU.x232bgx3iZbgxOttq6q', '06123456789');

--
-- Indexen voor geÃ«xporteerde tabellen
--

--
-- Indexen voor tabel `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geÃ«xporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
