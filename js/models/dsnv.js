function DanhSachNhanVien() {
  this.arr = [];
  this.them = function (nv) {
    this.arr.push(nv);
  };

  this.timViTri = function (tk) {
    ///tìm vị trí
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.tk === tk) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.xoa = function (tk) {
    var index = this.timViTri(tk);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.layChiTietNV = function (tk) {
    // tìm vị trí
    var index = this.timViTri(tk);
    if (index !== -1) {
      return this.arr[index];
    }
  };
  this.capNhat = function (nv) {
    // tìm vị trí nv cần cập nhật
    var index = this.timViTri(nv.tk);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
  this.timKiem = function (keyword) {
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      //chuyển tên thành chữ thường
      var xepLoaiLowerCase = nv.xepLoai.toLowerCase();
      var keywordLowerCase = keyword.toLowerCase();
      if (xepLoaiLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    }
    return mangTimKiem;
  };
}
