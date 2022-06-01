import javascript

from Comment c
where c.getText().regexpMatch("(?si).*\\b(TODO|FIXME)\\b.*")
select c, "TODO comments indicate that the code may not be complete."