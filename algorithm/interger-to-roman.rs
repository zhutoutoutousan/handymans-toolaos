impl Solution {
    pub fn int_to_roman(num: i32) -> String {
        let mut result = String::new();
        let mut num = num;
        let mut roman = vec![
            (1000, "M"),
            (900, "CM"),
            (500, "D"),
            (400, "CD"),
            (100, "C"),
            (90, "XC"),
            (50, "L"),
            (40, "XL"),
            (10, "X"),
            (9, "IX"),
            (5, "V"),
            (4, "IV"),
            (1, "I"),
        ];
        for (n, r) in roman {
            while num >= n {
                result.push_str(r);
                num -= n;
            }
        }
        result       
    }
}