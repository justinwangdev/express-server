use mhs;
select
    a.workno,
    b.name,
    a.containerno
from
    containerflow a,
    codetable b
where
    b.code = 'H'
    and b.value = a.flowno
    and workno = '10809023'
order by
    containerno;