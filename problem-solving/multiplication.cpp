// https://en.wikipedia.org/wiki/Computational_complexity_of_mathematical_operations

// { Driver Code Starts
#include<bits/stdc++.h>
using namespace std;

string multiplyStrings(string, string);

int main() {

    int t;
    cin>>t;
    while(t--) {
        string a;
        string b;
        cin>>a>>b;

        cout<<multiplyStrings(a,b)<<endl;
    }
}// } Driver Code Ends

string multiplyStrings(string s1, string s2) {
    
}


// Schönhage--Straßen algorithm
// https://en.wikipedia.org/wiki/Sch%C3%B6nhage%E2%80%93Strassen_algorithm