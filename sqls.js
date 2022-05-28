const allDepts = 'SELECT * FROM department';
const allRoles = 'SELECT * FROM role';
const allEmployees = `SELECT e.id, e.first_name as "First Name", e.last_name as "LAST NAME", r.title as "Title", d.name as 'DEPT', r.salary as "Salary", concat_ws(" ", m.first_name, m.last_name) as "Manager Name"
FROM employee e
join role r on e.role_id = r.id
left outer join (SELECT 
id, first_name, last_name, manager_id 
		from employee 
        where manager_id is not null) as m
		on e.id = m.manager_id
join department d on d.id = r.department_id` 

module.export = { allDepts, allRoles, allEmployees }
// module.exports={allDepts, allRoles, allEmployees)