package com.retail.catalog.product_search.util;

public class ProductSearchUtil {

    public static int damerauLevenshteinDistance(String productName, String searchName) {
        int[][] dp = new int[productName.length() + 1][searchName.length() + 1];

        // Initialize the dp table
        for (int i = 0; i <= productName.length(); i++) dp[i][0] = i;
        for (int j = 0; j <= searchName.length(); j++) dp[0][j] = j;

        // Populate the dp table with Damerau-Levenshtein logic
        for (int i = 1; i <= productName.length(); i++) {
            for (int j = 1; j <= searchName.length(); j++) {
                int cost = (productName.charAt(i - 1) == searchName.charAt(j - 1)) ? 0 : 1;
                dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                        dp[i - 1][j - 1] + cost
                );
                // Check for transpositions
                if (i > 1 && j > 1 && productName.charAt(i - 1) == searchName.charAt(j - 2) &&
                        productName.charAt(i - 2) == searchName.charAt(j - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
                }
            }
        }
        return dp[productName.length()][searchName.length()];
    }

}
