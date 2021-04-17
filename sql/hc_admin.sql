/*
Navicat MySQL Data Transfer

Source Server         : admin-server
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : hc_admin

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2021-04-17 17:51:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pid` varchar(255) DEFAULT NULL COMMENT '父级菜单id',
  `code` varchar(255) DEFAULT NULL COMMENT '权限编码',
  `type` varchar(255) DEFAULT '2' COMMENT '目录 1 资源 2',
  `enable` tinyint(1) DEFAULT '1' COMMENT '启用 1 禁用 0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) DEFAULT '2',
  `description` varchar(255) DEFAULT '普通用户',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '1', '超级管理员', '2021-04-17 15:00:48', '2021-04-17 15:00:52');
INSERT INTO `role` VALUES ('2', '2', '普通用户', '2021-04-17 15:01:44', '2021-04-17 15:01:47');

-- ----------------------------
-- Table structure for role_permission_connect
-- ----------------------------
DROP TABLE IF EXISTS `role_permission_connect`;
CREATE TABLE `role_permission_connect` (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  UNIQUE KEY `role_permission_connect_permissionId_roleId_unique` (`roleId`,`permissionId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permission_connect_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permission_connect_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_permission_connect
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `enable` tinyint(1) DEFAULT '1' COMMENT '启用 1 禁用 0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '', 'admin', '123456', '1', '2021-04-17 14:59:57', '2021-04-17 15:00:02');
INSERT INTO `user` VALUES ('3', null, 'hc-admin', '$2a$10$jSkK2ZDSrVs9FC5zS4dTKeGQlrCFMbnuDb6HbaJtTxbVdSLfaS4LK', '1', '2021-04-17 16:53:28', '2021-04-17 16:53:28');

-- ----------------------------
-- Table structure for user_role_connect
-- ----------------------------
DROP TABLE IF EXISTS `user_role_connect`;
CREATE TABLE `user_role_connect` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  UNIQUE KEY `user_role_connect_roleId_userId_unique` (`userId`,`roleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_role_connect_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_connect_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_role_connect
-- ----------------------------
INSERT INTO `user_role_connect` VALUES ('1', '1', '2021-04-17 15:01:15', '2021-04-17 15:01:18');
INSERT INTO `user_role_connect` VALUES ('3', '2', '2021-04-17 16:53:28', '2021-04-17 16:53:28');
