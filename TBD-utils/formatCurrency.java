import java.util.*;
import java.text.*;
// currency


public class formatCurrency {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double payment = scanner.nextDouble();
        scanner.close();
        /**
         * Desired Output
         * US: $12,324.13
         * India: Rs.12,324.13
         * China: ￥12,324.13
         * France: 12 324,13 €
         */
        String outputString;
        String currencyCountryNameString;
        String currencySymbolString;
        String [] country = {"US", "India", "China", "France"};
        String [] countryLocales = {"en_US", "hi_IN", "zh_CN", "fr_FR"};
        // Below code is wrong, why?
        /**
         * error: cannot find symbol
            currency.setLocale(locale);
                                ^
            symbol:   method setLocale(Locale)
            location: variable currency of type NumberFormat
            1 error
         */
        for (String c : countryLocales) {
            NumberFormat currency = NumberFormat.getCurrencyInstance();
            Locale locale = new Locale(c);
            ((Object) currency).setLocale(locale);
            outputString = currency.format(payment);
            currencyCountryNameString = locale.getDisplayCountry();
            currencySymbolString = currency.getCurrency().getSymbol();
            System.out.println(currencyCountryNameString + ": " + currencySymbolString + outputString);        
        }
    }
}

// Working version
// Reference： https://www.hackerrank.com/challenges/java-currency-formatter/forum
// import java.util.Scanner;
// import java.text.NumberFormat;
// import java.util.Locale;

// public class Solution {
    
//     public static void main(String[] args) {
//         /* Read input */
//         Scanner scanner = new Scanner(System.in);
//         double payment = scanner.nextDouble();
//         scanner.close();

//         /* Create custom Locale for India. 
//           I used the "IANA Language Subtag Registry" to find India's country code */
//         Locale indiaLocale = new Locale("en", "IN");

//         /* Create NumberFormats using Locales */
//         NumberFormat us     = NumberFormat.getCurrencyInstance(Locale.US);
//         NumberFormat india  = NumberFormat.getCurrencyInstance(indiaLocale);
//         NumberFormat china  = NumberFormat.getCurrencyInstance(Locale.CHINA);
//         NumberFormat france = NumberFormat.getCurrencyInstance(Locale.FRANCE);

//         /* Print output */        
//         System.out.println("US: "     + us.format(payment));
//         System.out.println("India: "  + india.format(payment));
//         System.out.println("China: "  + china.format(payment));
//         System.out.println("France: " + france.format(payment));
//     }
// }