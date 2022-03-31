// Code Idea Sync progress: 5%
// Visualization facility construction: 2%
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        if(root == NULL) return res;
        stack<TreeNode*> st;
        TreeNode* cur = root;
        while(cur || !st.empty()) {
            while(cur) {
                st.push(cur);
                cur = cur->left;
            }
            cur = st.top();
            st.pop();
            res.push_back(cur->val);
            cur = cur->right;
        }
        return res;
    }

    vector<int> inorderTraversalRecursive(TreeNode* root) {
        vector<int> res;
        if(root == NULL) return res;
        helper(root, res);
        return res;
    }

    // Helper function
    void helper(TreeNode* root, vector<int>& res) {
        if(root == NULL) return;
        helper(root->left, res);
        res.push_back(root->val);
        helper(root->right, res);
    }
};