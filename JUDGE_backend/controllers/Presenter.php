<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Presenter extends REST_Controller {

	public function index_get()
	{
		$this->generate_get_response($this->presenter);
	}

	public function index_post()
	{
		$this->generate_unauthorized_post_response($this->presenter);
	}

}