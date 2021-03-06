<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_admin extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE admin (
                admin_id    INT(11)  NOT NULL    AUTO_INCREMENT,
                first_name  VARCHAR(50)  NOT NULL,
                last_name   VARCHAR(50)  NOT NULL,
                email       VARCHAR(255) NOT NULL,
                password    VARCHAR(64)    NOT NULL,
                reset_token	VARCHAR(64),
                reset_expiration DATETIME,
                active      TINYINT(1)     NOT NULL DEFAULT 1,

				UNIQUE (email),

                PRIMARY KEY (admin_id)
                ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE admin;";
                $this->db->query($sql);

                $sql = "SET FOREIGN_KEY_CHECKS = 1;";
                $this->db->query($sql);
        }
}
?>