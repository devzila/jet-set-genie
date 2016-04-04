--
-- Table structure for table `destination_types`
--

CREATE TABLE IF NOT EXISTS `destination_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `destination_types`
--

INSERT INTO `destination_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Beach', '2016-03-30 13:15:00', '2016-03-30 13:15:00'),
(2, 'Mountains', '2016-03-30 13:15:00', '2016-03-30 13:15:00'),
(3, 'Europe', '2016-03-30 13:15:21', '2016-03-30 13:15:21'),
(4, 'Latin America', '2016-03-30 13:15:21', '2016-03-30 13:15:21');