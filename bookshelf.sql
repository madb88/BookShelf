-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 07 Cze 2016, 06:44
-- Wersja serwera: 5.5.49-0ubuntu0.14.04.1
-- Wersja PHP: 5.5.9-1ubuntu4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `bookshelf`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Books`
--

CREATE TABLE IF NOT EXISTS `Books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `author_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `description` text COLLATE utf8_polish_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=272 ;

--
-- Zrzut danych tabeli `Books`
--

INSERT INTO `Books` (`id`, `name`, `author_name`, `description`) VALUES
(268, 'Book19', 'Author19', 'Description: Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis ac lorem sed congue. Etiam et pretium leo, nec tincidunt arcu. In hac habitasse platea dictumst. Nullam lacinia nibh vel dapibus pulvinar. Etiam ligula diam, pellentesque quis orci eget, tristique hendrerit nisi. Nullam vulputate sit amet nisi sed accumsan. Aenean dignissim posuere neque, eu viverra tortor vestibulum a. Vestibulum vitae libero malesuada, scelerisque mauris scelerisque, blandit enim. In hac habitasse platea dictumst. Cras dictum vehicula magna non aliquet. Mauris at viverra mauris, at tempor diam.'),
(269, 'Book33', 'Author33', 'Description: Description: Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis ac lorem sed congue. Etiam et pretium leo, nec tincidunt arcu. In hac habitasse platea dictumst. Nullam lacinia nibh vel dapibus pulvinar. Etiam ligula diam, pellentesque quis orci eget, tristique hendrerit nisi. Nullam vulputate sit amet nisi sed accumsan. Aenean dignissim posuere neque, eu viverra tortor vestibulum a. Vestibulum vitae libero malesuada, scelerisque mauris scelerisque, blandit enim. In hac habitasse platea dictumst. Cras dictum vehicula magna non aliquet. Mauris at viverra mauris, at tempor diam.'),
(271, 'SDDAS', 'DSADSA', 'SDAS');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
