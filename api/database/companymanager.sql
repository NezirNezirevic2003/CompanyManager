-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql11.freesqldatabase.com
-- Gegenereerd op: 09 mrt 2022 om 13:54
-- Serverversie: 5.5.62-0ubuntu0.14.04.1
-- PHP-versie: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql11477389`
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
(1, 'IT', 'test desc'),
(2, 'test', 'hai'),
(4, 'test2', 'ha2i'),
(5, 'test222', 'ha2i222'),
(7, 'test2', 'ha2i');

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
(1, 'Hallo', 'Lelijkerd', 'nezirnezirevic310@gmail.com', '2022-03-16', 'other', '9000', '071234566'),
(7, 'aada', 'dasads', 'nezirnezirevic31ss0@gmail.com', '2022-03-24', 'partime', '1234', '1234454');

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
(1, 'undefined', 'nezir123', 'nezir123', 'nezirnezirevic310@gmail.com', '$2b$10$U7QD90i/NLRj5AWvG6k0Y.DAtct4Tw3aHuQKhXlhSiMCPHVdalU0u', '0612345678'),
(2, 'undefined', 'nezir123', 'nezir123', '209646@edu.ozhw.nl', '$2b$10$WqpmX8kQis5aQdGd9YlakOTvvTCJqigM.SXsNMKojG4zxBAOEhBRO', '0612345678'),
(3, 'undefined', 'nezir123', 'nezir123', 'admin@example.com', '$2b$10$rXdBg4uNZztW7PhSw03NjuvFmoxdRDwsuoy8qrctEQYbpHA0UUUU.', '0612345678'),
(4, 'undefined', 'samadov', 'samadov', 'muhammadsamadov@gmail.com', '$2b$10$CYRpYYTPqHe9C.LqPaiyAev3sGxQV/ZmeOu8iKa7CJnsPTqeCLwAC', '0648555065'),
(5, 'undefined', 'deeznuts', 'deeznuts', 'nokebol148@wodeda.com', '$2b$10$pPIOlkOikGgIG76BQNoO2OfF4NI1Mhg2RBJtPn3dzBZxorGa2JNfG', '3456546754667'),
(6, 'undefined', 'samadov201', 'samadov201', 'samadov123@gmail.com', '$2b$10$0Y2Vx/..urGo9YKFKQnGwuctHsp/ueWzS6WDo7YJ.6yMuSx0xNNc2', '06123456789'),
(7, 'undefined', 'adminn', 'adminn', 'a@b.caaaaaaaaa', '$2b$10$gsZv/KCj4gDTdZzJhxeUEO8bMK0LDSABFEBxIbbpuwGONnYZW1SRe', '12345678'),
(9, 'Jan', 'Pieter', 'jp1200', 'jp@gmail.com', '$2b$10$kiKIKhjseycokUFop0QMw.MsWKecs0BxLm9VjdWVYq9SrMGIJ3F5S', '061267899'),
(10, 'undefined', 'ricardo123', 'ricardo123', 'ricardo123@gmail.com', '$2b$10$WgUtOuCqE2b/3A4OFxv.Rux6B7lnX7attUZt7syFMZFzT00zj/fAS', '0612345678');

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT voor geÃ«xporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
