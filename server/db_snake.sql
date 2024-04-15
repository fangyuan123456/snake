-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2024-04-15 16:02:03
-- 服务器版本： 5.6.50-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_snake`
--

-- --------------------------------------------------------

--
-- 表的结构 `jumpInTable`
--

CREATE TABLE IF NOT EXISTS `jumpInTable` (
  `appId` varchar(50) NOT NULL,
  `gameName` varchar(50) NOT NULL,
  `data` varchar(500) NOT NULL,
  `totalNum` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `jumpOutTable`
--

CREATE TABLE IF NOT EXISTS `jumpOutTable` (
  `appId` varchar(50) NOT NULL,
  `gameName` varchar(50) NOT NULL,
  `data` varchar(500) NOT NULL,
  `totalNum` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `t_asset`
--

CREATE TABLE IF NOT EXISTS `t_asset` (
  `uid` bigint(11) NOT NULL,
  `items` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `t_asset`
--

INSERT INTO `t_asset` (`uid`, `items`) VALUES
(0, ''),
(2, '{"1":{"num":2},"2":{"num":2}}'),
(4, '{"1":{"num":2},"2":{"num":2}}'),
(6, '{"1":{"num":2},"2":{"num":2}}'),
(8, '{"1":{"num":2},"2":{"num":2}}'),
(9, '{"1":{"num":2},"2":{"num":2}}'),
(7, '{"1":{"num":2},"2":{"num":2}}'),
(11, '{"1":{"num":2},"2":{"num":2}}'),
(10, '{"1":{"num":2},"2":{"num":2}}'),
(12, '{"1":{"num":2},"2":{"num":2}}'),
(14, '{"1":{"num":2},"2":{"num":2}}'),
(15, '{"1":{"num":2},"2":{"num":2}}'),
(16, '{"1":{"num":2},"2":{"num":2}}'),
(24, '{"1":{"num":2},"2":{"num":2}}'),
(26, '{"1":{"num":2},"2":{"num":2}}'),
(27, '{"1":{"num":2},"2":{"num":2}}'),
(28, '{"1":{"num":2},"2":{"num":2}}'),
(17, '{"1":{"num":2},"2":{"num":2}}');

-- --------------------------------------------------------

--
-- 表的结构 `t_inviteReward`
--

CREATE TABLE IF NOT EXISTS `t_inviteReward` (
  `uid` int(10) NOT NULL,
  `inviteUids` varchar(50) NOT NULL DEFAULT '[]',
  `getRewardIndexs` varchar(20) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `t_inviteReward`
--

INSERT INTO `t_inviteReward` (`uid`, `inviteUids`, `getRewardIndexs`) VALUES
(0, '[]', '[]'),
(16, '[]', '[]'),
(17, '[16]', '[]');

-- --------------------------------------------------------

--
-- 表的结构 `t_user`
--

CREATE TABLE IF NOT EXISTS `t_user` (
  `nickName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `avatarUrl` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `uid` int(20) NOT NULL,
  `openId` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `gender` int(11) DEFAULT '0',
  `city` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `country` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `sceneid` int(5) DEFAULT NULL,
  `pathid` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `platform` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `t_user`
--

INSERT INTO `t_user` (`nickName`, `avatarUrl`, `uid`, `openId`, `gender`, `city`, `country`, `province`, `sceneid`, `pathid`, `platform`) VALUES
('uid_16', '', 16, 'fy', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_17', '', 17, 'fy1', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_18', '', 18, 'fy2', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_19', '', 19, 'fy3', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_20', '', 20, 'fy4', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
(NULL, NULL, 21, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 22, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
('uid_23', '', 23, 'fy5', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_24', '', 24, 'fy6', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
(NULL, NULL, 25, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
('uid_26', '', 26, 'fy7', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_27', '', 27, 'fy10', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
('uid_28', '', 28, 'fy11', 0, NULL, NULL, NULL, NULL, NULL, 'web'),
(NULL, NULL, 29, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 30, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 31, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 32, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 33, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 34, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 35, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 36, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 37, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, 38, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jumpInTable`
--
ALTER TABLE `jumpInTable`
  ADD PRIMARY KEY (`appId`);

--
-- Indexes for table `jumpOutTable`
--
ALTER TABLE `jumpOutTable`
  ADD PRIMARY KEY (`appId`);

--
-- Indexes for table `t_inviteReward`
--
ALTER TABLE `t_inviteReward`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `openId` (`openId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `uid` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
