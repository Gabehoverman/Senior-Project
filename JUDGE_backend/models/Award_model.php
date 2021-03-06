<?php
class Award_model extends CI_Model {

	private $award_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('award_id', 'title', 'active');
		$this->filter = array(
			'award_id' => 'award',
			'title' => 'award',
			'active' => 'award'
		);
		$this->name = 'award';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			title,
			active");

		// Put any joins here

		// Where clauses here

		$this->get_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$award_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('award_id' => $award_id));
				$result = $query->result();
				return $result;
			} else {
				return false;
			}
		} catch (Exception $e) {
			return false;
		}
	}

	public function update($data = array()) {
		try {
			return $this->db->update($this->name, $data, array("{$this->name}_id" => intval($data["{$this->name}_id"])));
		} catch (Exception $e) {
			return false;
		}
	}

}
?>
