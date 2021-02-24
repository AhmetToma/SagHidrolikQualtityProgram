using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class UretimBitirViewModel
    {


        public string urunKodu { get; set; }
        public int flow_Id { get; set; }
        public int FlowDetailsId { get; set; }
        public int lotNo { get; set; }
        public string MakineId { get; set; }
        public int baslaUretimOperatorId { get; set; }
        public int uretimBitirOpertorId { get; set; }
        public int Miktar { get; set; }
        public Fire fire1 { get; set; }
        public Fire fire2 { get; set; }
        public Fire tamir { get; set; }
        public Durus durus { get; set; }

    }
}
