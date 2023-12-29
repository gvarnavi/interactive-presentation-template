"use strict";
exports.id = 7475;
exports.ids = [7475];
exports.modules = {

/***/ 87475:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   diff: () => (/* binding */ diff)
/* harmony export */ });
var TOKEN_NAMES = {
  '+': 'inserted',
  '-': 'deleted',
  '@': 'meta'
};

const diff = {
  name: "diff",
  token: function(stream) {
    var tw_pos = stream.string.search(/[\t ]+?$/);

    if (!stream.sol() || tw_pos === 0) {
      stream.skipToEnd();
      return ("error " + (
        TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
    }

    var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

    if (tw_pos === -1) {
      stream.skipToEnd();
    } else {
      stream.pos = tw_pos;
    }

    return token_name;
  }
};



/***/ })

};
;