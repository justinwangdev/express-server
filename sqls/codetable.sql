use mhs;
select
    Name,
    Value
from
    codetable
where
    Code = 'H'
    and Tag = '0YY'
order by
    Name,
    SN;