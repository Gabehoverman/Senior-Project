<?php
// http://stackoverflow.com/questions/30379100/error-you-must-use-the-set-method-to-update-an-entry-fix
class Presenter_model extends CI_Model {

        private $presenter_id;
        private $first_name;
        private $last_name;
        private $suffix;
        private $email;
        private $institution_id;
        private $role_id;
        private $active;

	public function __construct()
	{
		$this->fields = array('presenter_id', 'first_name', 'last_name', 'suffix', 'email', 'institution_id', 'role_id', 'active');
		$this->filter = array(
			'presenter_id' => 'presenter',
			'email' => 'presenter',
			'institution' => 'institution',
			'role' => 'role',
			'active' => 'presenter',
			'summit_id' => 'poster'
		);
		$this->name = 'presenter';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}.{$this->name}_id,
                first_name,
                last_name,
                suffix,
                email,
                {$joins['i']}.title AS institution,
                {$joins['r']}.title AS role,
                {$this->name}.active,
                {$joins['po']}.summit_id");

		// Put any joins here

		$this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$this->name}.{$joins['i']}_id");
		$this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$this->name}.{$joins['r']}_id");
		$this->db->join("{$joins['po']}", "{$joins['po']}.{$this->name}_id = {$this->name}.{$this->name}_id");

		// Where clauses here

		$this->get_join_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$presenter_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('presenter_id' => $presenter_id));
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

	public function joins() {
		$joins = array(
			'i' => 'institution',
			'r' => 'role',
			'po' => 'poster'
		);
		return $joins;
	}

	protected function convert_join_field($field = NULL) {

		if($field === NULL) {
			return $field;
		}

		if($field === 'institution') {
			$field = 'title';
		}

		if($field === 'role') {
			$field = 'role';
		}

		return $field;

	}

}
?>
