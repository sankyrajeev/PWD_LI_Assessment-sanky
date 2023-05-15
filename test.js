var longestSubstring = function (s, k) {
    if (s.length < k) {
      return 0;
    } else {
      // Count the frequency of each character in the string
      let count = {};
      for (let i = 0; i < s.length; i++) {
        var char = s[i];
        if (count[char]) {
          count[char]++;
        } else {
          count[char] = 1;
        }
      }
       // Check if the entire string is a valid substring
      var isTrue = true;
      for (var key in count) {
        if (count.hasOwnProperty(key) && count[key] < k) {
          isTrue = false;
          break;
        }
      }
  
      if (isTrue) {
        return s.length;
      }
  
      var maxLength = 0;
      var start = 0;
      var end = 0;
      // Find the starting index of the first character with frequency less than k
      while (end < s.length) {
        if (count[s[end]] < k) {
          maxLength = Math.max(maxLength, longestSubstring(s.slice(start, end), k));
          // Move the start index to the next potential substring
          start = end + 1;
        }
        end++;
      }
      // Check if the last substring is valid
      maxLength = Math.max(maxLength, longestSubstring(s.slice(start), k));
  
      return maxLength;
    }
  };
  
  var s = "rajeeevrrriiivv";
  var k = 2;
  var result = longestSubstring(s, k);
  console.log(result);
  