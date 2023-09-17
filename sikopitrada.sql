/*
 Navicat Premium Data Transfer

 Source Server         : MySQL Local
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : sikopitrada

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 17/09/2023 18:33:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_dbsimda
-- ----------------------------
DROP TABLE IF EXISTS `t_dbsimda`;
CREATE TABLE `t_dbsimda`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ta` year NULL DEFAULT NULL,
  `db` varchar(255)  NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ta`(`ta` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dbsimda
-- ----------------------------
INSERT INTO `t_dbsimda` VALUES (1, 2023, 'DB2023');

-- ----------------------------
-- Table structure for t_kontrak
-- ----------------------------
DROP TABLE IF EXISTS `t_kontrak`;
CREATE TABLE `t_kontrak`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tahun` varchar(255)  NULL DEFAULT NULL,
  `no_kontrak` varchar(255)  NULL DEFAULT NULL,
  `kd_urusan` int NULL DEFAULT NULL,
  `kd_bidang` int NULL DEFAULT NULL,
  `kd_unit` int NULL DEFAULT NULL,
  `kd_sub` int NULL DEFAULT NULL,
  `tgl_kontrak` date NULL DEFAULT NULL,
  `keperluan` varchar(255)  NULL DEFAULT NULL,
  `waktu` varchar(255)  NULL DEFAULT NULL,
  `nilai` double NULL DEFAULT NULL,
  `nm_perusahaan` varchar(255)  NULL DEFAULT NULL,
  `alamat` varchar(255)  NULL DEFAULT NULL,
  `nm_pemilik` varchar(255)  NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `no_kontrak`(`no_kontrak` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_kontrak
-- ----------------------------
INSERT INTO `t_kontrak` VALUES (1, '2023', '01-DOKA/DISDIK/SR/2023', 1, 1, 1, 1, '2023-08-01', 'Rehabilitasi Ruang Kelas SDN 14  Simeulue Timur', '120 (SERATUS DUA PULUH) HARI KELENDER', 555867000, 'CV. KARYA MEUTUAH', 'JL. NUSANTARA DUSUN MAWAR DESA SUKA MAJU KEC. SIME', 'SUBHAN FARID');
INSERT INTO `t_kontrak` VALUES (2, '2023', '16-DAK SMP Disdik/SWA-SEHATI/2023', 1, 1, 1, 1, '2023-06-12', 'Pembangunan ruang UKS beserta perabotnya SMP NEGERI 4 SIMEULUE BARAT ', '203 (DUA RATUS TIGA) HARI KELENDER', 130080000, 'POKMAS SEHATI DESA SEMBILAN', 'DESA SEMBILAN KEC. SIMEULUE BARAT KAB. SIMEULUE', 'RANI ADI');

-- ----------------------------
-- Table structure for t_opd
-- ----------------------------
DROP TABLE IF EXISTS `t_opd`;
CREATE TABLE `t_opd`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `kd_urusan` int NULL DEFAULT NULL,
  `kd_bidang` int NULL DEFAULT NULL,
  `kd_unit` int NULL DEFAULT NULL,
  `kd_sub` int NULL DEFAULT NULL,
  `nm_sub_unit` varchar(255)  NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_opd
-- ----------------------------
INSERT INTO `t_opd` VALUES (5, 1, 1, 1, 1, 'DINAS PENDIDIKAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (6, 2, 2, 1, 1, 'DINAS PEMBERDAYAAN PEREMPUAN, PERLINDUNGAN ANAK DAN KELUARGA BERENCANA KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (7, 1, 2, 1, 1, 'DINAS KESEHATAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (8, 1, 3, 1, 1, 'DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (10, 4, 4, 1, 1, 'BADAN PENGELOLAAN KEUANGAN DAERAH KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (11, 2, 17, 1, 1, 'DINAS PERPUSTAKAAN DAN KEARSIPAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (12, 1, 2, 2, 1, 'RUMAH SAKIT UMUM DAERAH KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (13, 2, 1, 1, 1, 'DINAS TENAGA KERJA DAN TRANSMIGRASI KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (14, 3, 7, 1, 1, 'DINAS PERINDUSTRIAN, PERDAGANGAN, KOPERASI DAN USAHA KECIL MENENGAH KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (15, 3, 1, 1, 1, 'DINAS KELAUTAN DAN PERIKANAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (16, 1, 6, 1, 1, 'DINAS SOSIAL KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (17, 3, 2, 1, 1, 'DINAS PARIWISATA DAN KEBUDAYAAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (18, 3, 3, 2, 1, 'DINAS PERTANIAN DAN PANGAN KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (19, 3, 3, 1, 1, 'DINAS PERKEBUNAN, PETERNAKAN DAN KESEHATAN HEWAN  KABUPATEN SIMEULUE');
INSERT INTO `t_opd` VALUES (20, 4, 13, 4, 1, 'DINAS SYARIAT ISLAM DAN PENDIDIKAN DAYAH KABUPATEN SIMEULUE');

-- ----------------------------
-- Table structure for t_penandatangan
-- ----------------------------
DROP TABLE IF EXISTS `t_penandatangan`;
CREATE TABLE `t_penandatangan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255)  NULL DEFAULT NULL,
  `jabatan` varchar(255)  NULL DEFAULT NULL,
  `nip` varchar(255)  NULL DEFAULT NULL,
  `pangkat` varchar(255)  NULL DEFAULT NULL,
  `golongan` varchar(255)  NULL DEFAULT NULL,
  `aktif` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_penandatangan
-- ----------------------------
INSERT INTO `t_penandatangan` VALUES (4, 'IRWAN AZIZ, SE', 'Kepala Bidang Perbendaharaan BKPD Kab. Simeulue', '197304071994031004', 'Penata Tingkat I', 'III/d', 1);

-- ----------------------------
-- Table structure for t_realisasi
-- ----------------------------
DROP TABLE IF EXISTS `t_realisasi`;
CREATE TABLE `t_realisasi`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `jenis` int NULL DEFAULT NULL,
  `ta` year NULL DEFAULT NULL,
  `id_sdana` int NULL DEFAULT NULL,
  `id_opd` int NULL DEFAULT NULL,
  `no_kontrak` varchar(255)  NULL DEFAULT NULL,
  `tgl_kontrak` date NULL DEFAULT NULL,
  `nm_perusahaan` varchar(255)  NULL DEFAULT NULL,
  `keperluan` text  NULL,
  `nilai_kontrak` double NULL DEFAULT NULL,
  `no_sp2d_1` varchar(255)  NULL DEFAULT NULL,
  `no_sp2d_2` varchar(255)  NULL DEFAULT NULL,
  `no_sp2d_3` varchar(255)  NULL DEFAULT NULL,
  `no_sp2d_4` varchar(255)  NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `no_kontrak`(`no_kontrak` ASC) USING BTREE,
  INDEX `sumberdana`(`id_sdana` ASC) USING BTREE,
  INDEX `opd`(`id_opd` ASC) USING BTREE,
  CONSTRAINT `opd` FOREIGN KEY (`id_opd`) REFERENCES `t_opd` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sumberdana` FOREIGN KEY (`id_sdana`) REFERENCES `t_sumberdana` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_realisasi
-- ----------------------------
INSERT INTO `t_realisasi` VALUES (27, 1, 2023, 74, 11, '2.23.2.24.00.3.3/204/PPK/2023', '2023-07-18', 'PT. PUGA MANDIRI GRUP', 'PEMBANGUNAN GEDUNG PERPUSTAKAAN', 8664873000, '04562/SP2D/2023', '-', '-', '-');
INSERT INTO `t_realisasi` VALUES (28, 1, 2023, 74, 11, '2.23.2.24.00.3.3/205/PPK/2023', '2023-07-18', 'CV. ADITYA KARYA', 'PENGAWASAN GEDUNG PERPUSTAKAAN', 229251000, '04563/SP2D/2023', '-', '-', '-');
INSERT INTO `t_realisasi` VALUES (29, 1, 2023, 78, 8, '620/50/KONT-BM/DAK-PUPR/2023', '2023-07-04', 'PT BUMI ACEH CITRA PERSADA', 'Peningkatan Jalan Kota Batu - Babang - Pulau Bengkalak (DAK)\r', 18178168000, '04108/SP2D/2023', '-', '-', '-');
INSERT INTO `t_realisasi` VALUES (30, 1, 2023, 74, 11, '00.23.2/105/PPK/2023', '2023-04-12', 'MAWAK SIMEULUE CONSULTANT CV', 'REVIEW DESAIN PERENCANAAN PEMBANGUNAN GEDUNG PERPUSTAKAAN ', 49839000, '04564/SP2D/2023', '-', '-', '-');

-- ----------------------------
-- Table structure for t_sp2d
-- ----------------------------
DROP TABLE IF EXISTS `t_sp2d`;
CREATE TABLE `t_sp2d`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tahap` int NULL DEFAULT NULL,
  `no_sp2d` varchar(255)  NULL DEFAULT NULL,
  `tgl_sp2d` date NULL DEFAULT NULL,
  `id_sdana` int NULL DEFAULT NULL,
  `id_opd` int NULL DEFAULT NULL,
  `no_kontrak` varchar(255)  NULL DEFAULT NULL,
  `keterangan` varchar(255)  NULL DEFAULT NULL,
  `nilai` double NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `no_sp2d`(`no_sp2d` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_sp2d
-- ----------------------------
INSERT INTO `t_sp2d` VALUES (13, 1, '04562/SP2D/2023', '2023-08-11', 74, 11, '2.23.2.24.00.3.3/204/PPK/2023', 'PEMBAYARAN LUNAS BIAYA UANG MUKA(UM) SEBESAR 25% PEMBANGUNAN GEDUNG PERPUSTAKAAN PADA DINAS PERPUSTAKAAN DAN KEARSIPAN SUMBER DANA DAK TA. 2023', 2166218250);
INSERT INTO `t_sp2d` VALUES (14, 1, '04563/SP2D/2023', '2023-08-11', 74, 11, '2.23.2.24.00.3.3/205/PPK/2023', 'PEMBAYARAN LUNAS BIAYA UANG MUKA(UM) SEBESAR 25% PENGAWASAN PEMBANGUNAN GEDUNG PERPUSTAKAAN PADA DINAS PERPUSTAKAAN DAN KEARSIPAN SUMBER DANA DAK TA. 2023', 57312750);
INSERT INTO `t_sp2d` VALUES (15, 1, '04108/SP2D/2023', '2023-07-28', 78, 8, '620/50/KONT-BM/DAK-PUPR/2023', 'Pembayaran Uang Muka Kerja sebesar 20% pekerjaan Peningkatan Jalan Kota Batu - Babang - Pulau Bengkalak (DAK)\r sesuai Kontrak No. 620/50/KONT-BM/DAK-PUPR/2023 Tgl. 04 Juli 2023 (TA. 2023)', 3635633600);
INSERT INTO `t_sp2d` VALUES (16, 1, '04564/SP2D/2023', '2023-08-11', 74, 11, '00.23.2/105/PPK/2023', 'PEMBAYARAN LUNAS BELANJA REVIEW DESAIN PERENCANAAN PEMBANGUNAN GEDUNG PERPUSTAKAAN PADA DINAS PERPUSTAKAAN DAN KEARSIPAN SUMBER DANA DAK TAHUN ANGGARAN 2023', 49839000);

-- ----------------------------
-- Table structure for t_sumberdana
-- ----------------------------
DROP TABLE IF EXISTS `t_sumberdana`;
CREATE TABLE `t_sumberdana`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sdana` int NULL DEFAULT NULL,
  `id_jdana` int NULL DEFAULT NULL,
  `id_bidang` int NULL DEFAULT NULL,
  `id_opd` int NULL DEFAULT NULL,
  `nama` varchar(255)  NULL DEFAULT NULL,
  `nilai` double NULL DEFAULT NULL,
  `ta` year NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 102  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_sumberdana
-- ----------------------------
INSERT INTO `t_sumberdana` VALUES (59, 0, 0, 0, 0, 'DAK Fisik', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (60, 59, 0, 0, 0, 'DAK Fisik Penugasan', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (61, 59, 60, 0, 0, 'Kesehatan dan KB', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (62, 59, 60, 61, 6, 'Keluarga Berencana', 1112157000, 2023);
INSERT INTO `t_sumberdana` VALUES (67, 59, 60, 61, 7, 'Penguatan Penurunan Angka Kematian Ibu, Bayi dan Intervensi Stunting ', 1145814000, 2023);
INSERT INTO `t_sumberdana` VALUES (68, 59, 60, 61, 7, 'Penguatan Sistem Kesehatan', 9542861000, 2023);
INSERT INTO `t_sumberdana` VALUES (69, 59, 60, 61, 7, 'Pengendalian Penyakit', 2324295000, 2023);
INSERT INTO `t_sumberdana` VALUES (70, 59, 60, 0, 0, 'Pendidikan', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (71, 59, 60, 70, 5, 'PAUD', 635512000, 2023);
INSERT INTO `t_sumberdana` VALUES (72, 59, 60, 70, 5, 'SD', 6814804000, 2023);
INSERT INTO `t_sumberdana` VALUES (73, 59, 60, 70, 5, 'SMP', 8795055000, 2023);
INSERT INTO `t_sumberdana` VALUES (74, 59, 60, 70, 11, 'Perpustakaan', 10670023000, 2023);
INSERT INTO `t_sumberdana` VALUES (75, 59, 60, 0, 0, 'Jalan', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (76, 59, 60, 0, 0, 'Air Minum', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (77, 59, 60, 0, 0, 'Sanitasi', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (78, 59, 60, 75, 8, 'Jalan', 19830747000, 2023);
INSERT INTO `t_sumberdana` VALUES (79, 59, 60, 76, 8, 'Air Minum', 4003361000, 2023);
INSERT INTO `t_sumberdana` VALUES (80, 59, 60, 77, 8, 'Sanitasi', 5615643000, 2023);
INSERT INTO `t_sumberdana` VALUES (81, 0, 0, 0, 0, 'DOKA', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (83, 81, 0, 0, 0, '-', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (84, 81, 83, 0, 0, '-', 0, 2023);
INSERT INTO `t_sumberdana` VALUES (85, 81, 83, 84, 5, 'DOKA', 4131076832, 2023);
INSERT INTO `t_sumberdana` VALUES (86, 81, 83, 84, 7, 'DOKA', 2217352151, 2023);
INSERT INTO `t_sumberdana` VALUES (87, 81, 83, 84, 12, 'DOKA', 1156621000, 2023);
INSERT INTO `t_sumberdana` VALUES (88, 81, 83, 84, 8, 'DOKA', 9160000000, 2023);
INSERT INTO `t_sumberdana` VALUES (89, 81, 83, 84, 13, 'DOKA', 1002500000, 2023);
INSERT INTO `t_sumberdana` VALUES (90, 81, 83, 84, 14, 'DOKA', 1173093244, 2023);
INSERT INTO `t_sumberdana` VALUES (91, 81, 83, 84, 15, 'DOKA', 1500000000, 2023);
INSERT INTO `t_sumberdana` VALUES (92, 81, 83, 84, 16, 'DOKA', 570337214, 2023);
INSERT INTO `t_sumberdana` VALUES (93, 81, 83, 84, 17, 'DOKA', 1924383891, 2023);
INSERT INTO `t_sumberdana` VALUES (94, 81, 83, 84, 18, 'DOKA', 2252000000, 2023);
INSERT INTO `t_sumberdana` VALUES (95, 81, 83, 84, 19, 'DOKA', 1000000000, 2023);
INSERT INTO `t_sumberdana` VALUES (96, 81, 83, 84, 20, 'DOKA', 4360276495, 2023);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_opd` int NULL DEFAULT NULL,
  `nama` varchar(255)  NULL DEFAULT NULL,
  `nip` varchar(255)  NULL DEFAULT NULL,
  `user` varchar(255)  NULL DEFAULT NULL,
  `pass` varchar(255)  NULL DEFAULT NULL,
  `jabatan` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_opd_user`(`id_opd` ASC) USING BTREE,
  CONSTRAINT `id_opd_user` FOREIGN KEY (`id_opd`) REFERENCES `t_opd` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (3, 10, 'IRWAN AZIZ, SE', '197304071994031004', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1);
INSERT INTO `t_user` VALUES (5, 10, 'MHD. REZA HANAFI, S.K.M', '199008172015051001', 'operator', '4b583376b2767b923c3e1da60d10de59', 2);
INSERT INTO `t_user` VALUES (6, 10, 'Ahmadliyah, SH', '-', 'auditor', 'f7d07071ed9431ecae3a8d45b4c82bb2', 3);

-- ----------------------------
-- View structure for v_realisasi
-- ----------------------------
DROP VIEW IF EXISTS `v_realisasi`;
CREATE VIEW `v_realisasi` AS select `t_realisasi`.`id` AS `id`,`t_realisasi`.`jenis` AS `jenis`,`t_realisasi`.`ta` AS `ta`,`t_realisasi`.`id_opd` AS `id_opd`,`t_realisasi`.`no_kontrak` AS `no_kontrak`,`t_realisasi`.`tgl_kontrak` AS `tgl_kontrak`,`t_realisasi`.`nm_perusahaan` AS `nm_perusahaan`,`t_realisasi`.`keperluan` AS `keperluan`,`t_realisasi`.`nilai_kontrak` AS `nilai_kontrak`,`t_realisasi`.`no_sp2d_1` AS `no_sp2d_1`,`t_realisasi`.`no_sp2d_2` AS `no_sp2d_2`,`t_realisasi`.`no_sp2d_3` AS `no_sp2d_3`,`t_realisasi`.`no_sp2d_4` AS `no_sp2d_4`,`t_opd`.`nm_sub_unit` AS `nm_sub_unit`,`t_opd`.`kd_sub` AS `kd_sub`,`t_opd`.`kd_unit` AS `kd_unit`,`t_opd`.`kd_bidang` AS `kd_bidang`,`t_opd`.`kd_urusan` AS `kd_urusan`,`v_sumberdana`.`id_sdana` AS `id_sdana`,`v_sumberdana`.`id_jdana` AS `id_jdana`,`v_sumberdana`.`id_bidang` AS `id_bidang`,`v_sumberdana`.`id` AS `id_sbidang`,`v_sumberdana`.`nama` AS `nama_sbidang`,`v_sumberdana`.`nilai` AS `nilai_pagu`,ifnull(`sp2d1`.`tgl_sp2d`,'-') AS `tgl_sp2d1`,ifnull(`sp2d1`.`keterangan`,'-') AS `keterangan1`,ifnull(`sp2d1`.`nilai`,0) AS `nilai1`,ifnull(`sp2d2`.`tgl_sp2d`,'-') AS `tgl_sp2d2`,ifnull(`sp2d2`.`keterangan`,'-') AS `keterangan2`,ifnull(`sp2d2`.`nilai`,0) AS `nilai2`,ifnull(`sp2d3`.`tgl_sp2d`,'-') AS `tgl_sp2d3`,ifnull(`sp2d3`.`keterangan`,'-') AS `keterangan3`,ifnull(`sp2d3`.`nilai`,0) AS `nilai3`,ifnull(`sp2d4`.`tgl_sp2d`,'-') AS `tgl_sp2d4`,ifnull(`sp2d4`.`keterangan`,'-') AS `keterangan4`,ifnull(`sp2d4`.`nilai`,0) AS `nilai4`,`v_sumberdana`.`nama_sdana` AS `nama_sdana`,`v_sumberdana`.`nama_jdana` AS `nama_jdana`,`v_sumberdana`.`nama_bidang` AS `nama_bidang` from ((((((`t_realisasi` left join `t_opd` on((`t_realisasi`.`id_opd` = `t_opd`.`id`))) left join `v_sumberdana` on((`t_realisasi`.`id_sdana` = `v_sumberdana`.`id`))) left join `t_sp2d` `sp2d1` on((`t_realisasi`.`no_sp2d_1` = `sp2d1`.`no_sp2d`))) left join `t_sp2d` `sp2d2` on((`t_realisasi`.`no_sp2d_2` = `sp2d2`.`no_sp2d`))) left join `t_sp2d` `sp2d3` on((`t_realisasi`.`no_sp2d_3` = `sp2d3`.`no_sp2d`))) left join `t_sp2d` `sp2d4` on((`t_realisasi`.`no_sp2d_4` = `sp2d4`.`no_sp2d`)));

-- ----------------------------
-- View structure for v_stat_realisasi
-- ----------------------------
DROP VIEW IF EXISTS `v_stat_realisasi`;
CREATE VIEW `v_stat_realisasi` AS select `v_realisasi`.`nama_sdana` AS `nama_sdana`,`v_realisasi`.`nama_jdana` AS `nama_jdana`,`v_realisasi`.`nama_bidang` AS `nama_bidang`,`v_realisasi`.`nama_sbidang` AS `nama_sbidang`,`v_realisasi`.`nilai_pagu` AS `nilai_pagu`,sum(`v_realisasi`.`nilai1`) AS `nilai1`,sum(`v_realisasi`.`nilai2`) AS `nilai2`,sum(`v_realisasi`.`nilai3`) AS `nilai3`,sum(`v_realisasi`.`nilai4`) AS `nilai4`,(((sum(`v_realisasi`.`nilai1`) + sum(`v_realisasi`.`nilai2`)) + sum(`v_realisasi`.`nilai3`)) + sum(`v_realisasi`.`nilai4`)) AS `nilaitotal`,(`v_realisasi`.`nilai_pagu` - (((sum(`v_realisasi`.`nilai1`) + sum(`v_realisasi`.`nilai2`)) + sum(`v_realisasi`.`nilai3`)) + sum(`v_realisasi`.`nilai4`))) AS `sisa`,round((((((sum(`v_realisasi`.`nilai1`) + sum(`v_realisasi`.`nilai2`)) + sum(`v_realisasi`.`nilai3`)) + sum(`v_realisasi`.`nilai4`)) / `v_realisasi`.`nilai_pagu`) * 100),2) AS `persentase` from `v_realisasi` group by `v_realisasi`.`nama_sbidang`;

-- ----------------------------
-- View structure for v_sumberdana
-- ----------------------------
DROP VIEW IF EXISTS `v_sumberdana`;
CREATE VIEW `v_sumberdana` AS select `t_sumberdana`.`id` AS `id`,`t_sumberdana`.`nama` AS `nama`,`t_sumberdana`.`ta` AS `ta`,`t_sumberdana`.`id_sdana` AS `id_sdana`,`t_sumberdana`.`id_jdana` AS `id_jdana`,`t_sumberdana`.`id_bidang` AS `id_bidang`,`t_sumberdana`.`id_opd` AS `id_opd`,`t_sumberdana`.`nilai` AS `nilai`,`t_opd`.`nm_sub_unit` AS `nm_sub_unit`,`sdana`.`nama` AS `nama_sdana`,`jdana`.`nama` AS `nama_jdana`,`bidang`.`nama` AS `nama_bidang` from ((((`t_sumberdana` left join `t_opd` on((`t_sumberdana`.`id_opd` = `t_opd`.`id`))) left join `t_sumberdana` `sdana` on((`t_sumberdana`.`id_sdana` = `sdana`.`id`))) left join `t_sumberdana` `jdana` on((`t_sumberdana`.`id_jdana` = `jdana`.`id`))) left join `t_sumberdana` `bidang` on((`t_sumberdana`.`id_bidang` = `bidang`.`id`)));

-- ----------------------------
-- View structure for v_user
-- ----------------------------
DROP VIEW IF EXISTS `v_user`;
CREATE VIEW `v_user` AS select `t_user`.`id` AS `id`,`t_user`.`id_opd` AS `id_opd`,`t_user`.`nama` AS `nama`,`t_user`.`nip` AS `nip`,`t_user`.`user` AS `user`,`t_user`.`jabatan` AS `jabatan`,if((`t_user`.`jabatan` = 1),'Administrator',if((`t_user`.`jabatan` = 2),'Operator','Auditor')) AS `txt_jabatan`,`t_opd`.`kd_urusan` AS `kd_urusan`,`t_opd`.`kd_bidang` AS `kd_bidang`,`t_opd`.`kd_unit` AS `kd_unit`,`t_opd`.`kd_sub` AS `kd_sub`,`t_opd`.`nm_sub_unit` AS `nm_sub_unit`,`t_user`.`pass` AS `pass` from (`t_user` left join `t_opd` on((`t_user`.`id_opd` = `t_opd`.`id`)));

-- ----------------------------
-- Procedure structure for singkronOPD
-- ----------------------------
DROP PROCEDURE IF EXISTS `singkronOPD`;
delimiter ;;
CREATE PROCEDURE `singkronOPD`(_kd_urusan INT,
	_kd_bidang INT,
	_kd_unit INT,
	_kd_sub INT,
	_nm_sub_unit VARCHAR ( 255 ))
BEGIN
	IF
		EXISTS ( SELECT * FROM t_opd WHERE kd_urusan = _kd_urusan AND kd_bidang = _kd_bidang AND kd_unit = _kd_unit AND kd_sub = _kd_sub ) THEN
			UPDATE t_opd 
			SET kd_urusan = _kd_urusan,
			kd_bidang = _kd_bidang,
			kd_unit = _kd_unit,
			kd_sub = _kd_sub,
			nm_sub_unit = _nm_sub_unit 
		WHERE
			kd_urusan = _kd_urusan 
			AND kd_bidang = _kd_bidang 
			AND kd_unit = _kd_unit 
			AND kd_sub = _kd_sub;
		ELSE INSERT INTO t_opd ( id, kd_urusan, kd_bidang, kd_unit, kd_sub, nm_sub_unit )
		VALUES
			( NULL, _kd_urusan, _kd_bidang, _kd_unit, _kd_sub, _nm_sub_unit );
		
	END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for stat
-- ----------------------------
DROP PROCEDURE IF EXISTS `stat`;
delimiter ;;
CREATE PROCEDURE `stat`(_ta INT)
BEGIN
	SELECT
	`v_realisasi`.`nama_sdana` AS `nama_sdana`,
	`v_realisasi`.`nama_jdana` AS `nama_jdana`,
	`v_realisasi`.`nama_bidang` AS `nama_bidang`,
	`v_realisasi`.`nama_sbidang` AS `nama_sbidang`,
	`v_realisasi`.`nilai_pagu` AS `nilai_pagu`,
	sum( `v_realisasi`.`nilai1` ) AS `nilai1`,
	sum( `v_realisasi`.`nilai2` ) AS `nilai2`,
	sum( `v_realisasi`.`nilai3` ) AS `nilai3`,
	sum( `v_realisasi`.`nilai4` ) AS `nilai4`,(((
				sum( `v_realisasi`.`nilai1` ) + sum( `v_realisasi`.`nilai2` )) + sum( `v_realisasi`.`nilai3` )) + sum( `v_realisasi`.`nilai4` )) AS `nilaitotal`,(
		`v_realisasi`.`nilai_pagu` - (((
				sum( `v_realisasi`.`nilai1` ) + sum( `v_realisasi`.`nilai2` )) + sum( `v_realisasi`.`nilai3` )) + sum( `v_realisasi`.`nilai4` ))) AS `sisa`,
	round((((((
							sum( `v_realisasi`.`nilai1` ) + sum( `v_realisasi`.`nilai2` )) + sum( `v_realisasi`.`nilai3` )) + sum( `v_realisasi`.`nilai4` )) / `v_realisasi`.`nilai_pagu` 
				) * 100 
			),
		2 
	) AS `persentase` 
FROM
	`v_realisasi` 
WHERE v_realisasi.ta = _ta
GROUP BY
	`v_realisasi`.`nama_sbidang`;

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
