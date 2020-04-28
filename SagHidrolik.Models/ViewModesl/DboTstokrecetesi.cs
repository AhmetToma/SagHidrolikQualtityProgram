using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class DboTstokrecetesi
    {
        public int Ref { get; set; }
        public int? Stokref { get; set; }
        public string Stk { get; set; }
        public string Sta { get; set; }
        public string Stb { get; set; }
        public double? Miktar { get; set; }
        public int? Stoktur { get; set; }
        public int? Masterref { get; set; }
        public double? Fireoran { get; set; }
        public double? Firemiktari { get; set; }
        public int? Dovizc { get; set; }
        public double? Brftl { get; set; }
        public double? Brfd { get; set; }
        public string StokpId { get; set; }
        public int? Aktarim { get; set; }
        public double? En { get; set; }
        public double? Boy { get; set; }
        public double? Kalinlik { get; set; }
        public double? Imiktari { get; set; }
        public double? Cbbolen { get; set; }
        public string Ibirimi { get; set; }
        public double? Genislik { get; set; }
        public double? Firesizmiktar { get; set; }
        public int? Giderref { get; set; }
        public string Giderkodu { get; set; }
        public double? Gideryuzde { get; set; }
        public double? Recetemiktari { get; set; }
        public string SatirpId { get; set; }
        public string Astok { get; set; }
        public string GstokpId { get; set; }
    }
}
