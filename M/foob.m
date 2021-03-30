f(x, y) = sin(pi*x*y)*sqrt(x*y)

function q = g(y)
  q = ones( size(y));
  for i = 1:length (y)
    f = @(x) sin (pi*x.*y(i)) .* sqrt (x.*y(i));
    q(i) = quadgk (f, 0, 1);
  endfor
 endfunction

 
I = dblquad (@(x, y) sin (pi*x.*y) .* sqrt (x.*y), 0, 1, 0, 1)

disp(I)