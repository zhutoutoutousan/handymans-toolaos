@echo off
Echo:
Set "var1=Red Pippin"
Set "var2=St Edmunds Pippin"
Set "var3=Egremont Russet"

Echo: before: var1=%var1% var2=%var2% var3=%var3%
call: :myGetFunc var1 var2 var3
Echo: after: var1=%var1%  var2=%var2% var3=%var3%

Echo:&pause&goto:eof
:: Function section
:myGetFunc - passing a variable by reference
Set "%~1=return64"
Set "%~3=return65"
EXIT /B