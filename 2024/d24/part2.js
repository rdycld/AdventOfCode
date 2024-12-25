


// x00 XOR y00 -> z00  x00 AND y00 -> bdj
// y01 XOR x01 -> twd  y01 AND x01 -> gwd  cbq OR gwd -> rhr  twd AND bdj -> cbq  twd XOR bdj -> z01
// x02 XOR y02 -> rsk  y02 AND x02 -> fph  fph OR nkm -> twj  rhr AND rsk -> nkm  rsk XOR rhr -> z02
// x03 XOR y03 -> jfr  y03 AND x03 -> rnw  nbj OR rnw -> dft  twj AND jfr -> nbj  jfr XOR twj -> z03
// y04 XOR x04 -> vwf  y04 AND x04 -> hwt  hwt OR mfj -> str  vwf AND dft -> mfj  dft XOR vwf -> z04
// x05 XOR y05 -> gtt  x05 AND y05 -> vth  vth OR jvv -> rjb  str AND gtt -> jvv  str XOR gtt -> z05
// y06 XOR x06 -> jrg  x06 AND y06 -> dbc  mjs OR dbc -> mwg  jrg AND rjb -> mjs  rjb XOR jrg -> z06
// x07 XOR y07 -> wnd  x07 AND y07 -> vqk  hnm OR vqk -> whc  mwg AND wnd -> hnm  wnd XOR mwg -> z07
// y08 XOR x08 -> ndh  y08 AND x08 -> gth  rbb OR gth -> bpc  ndh AND whc -> rbb  whc XOR ndh -> z08
// x09 XOR y09 -> hsq  x09 AND y09 -> qsm  rjj OR qsm -> kqs  hsq AND bpc -> rjj  bpc XOR hsq -> z09
// y10 XOR x10 -> fnm  y10 AND x10 -> mjb  mjb OR knt -> tnr  kqs AND fnm -> knt  fnm XOR kqs -> z10
// y11 XOR x11 -> kdw  x11 AND y11 -> mdq  fkw OR mdq -> cdq  tnr AND kdw -> fkw  tnr XOR kdw -> z11
// y12 XOR x12 -> nhb  x12 AND y12 -> psw  psw OR nng -> kth  nhb AND cdq -> nng  nhb XOR cdq -> z12
// x13 XOR y13 -> mtp  y13 AND x13 -> qrs  cns OR qrs -> rpt  mtp AND kth -> cns  mtp XOR kth -> z13
// y14 XOR x14 -> hbh  x14 AND y14 -> skj  ctc OR skj -> sqb  hbh AND rpt -> ctc  rpt XOR hbh -> z14
// x15 XOR y15 -> ckk  x15 AND y15 -> jhq  jhq OR dgn -> msm  ckk AND sqb -> dgn  ckk XOR sqb -> z15
// x16 XOR y16 -> qdt  y16 AND x16 -> hjd  hjd OR bjj -> qjv  msm AND qdt -> bjj  msm XOR qdt -> z16
// x17 XOR y17 -> pts  y17 AND x17 -> tkm  tkm OR mmm -> fhb  qjv AND pts -> mmm  pts XOR qjv -> z17
// x18 XOR y18 -> pbj  y18 AND x18 -> pbd  pbd OR wfr -> spq  fhb AND pbj -> wfr  fhb XOR pbj -> z18
// x19 XOR y19 -> jvg  x19 AND y19 -> hgk  hgk OR gfv -> crt  spq AND jvg -> gfv  spq XOR jvg -> z19
// x20 XOR y20 -> vhk  x20 AND y20 -> khd  khd OR qgh -> gjg  vhk AND crt -> qgh  crt XOR vhk -> z20
// y21 XOR x21 -> nkr  x21 AND y21 -> mtd  mtd OR dvg -> rtk  nkr AND gjg -> dvg  nkr XOR gjg -> z21
// y22 XOR x22 -> kqc  x22 AND y22 -> hjf  ssd OR hjf -> gvs  kqc AND rtk -> ssd  kqc XOR rtk -> z22
// x23 XOR y23 -> tmj  y23 AND x23 -> frm  psk OR frm -> wfg  gvs AND tmj -> psk  gvs XOR tmj -> z23
// x24 XOR y24 -> qbp  x24 AND y24 -> qcb  fws OR qcb -> pmm  qbp AND wfg -> fws  wfg XOR qbp -> z24
// x25 XOR y25 -> msc  x25 AND y25 -> qmv  qmv OR ftq -> mbg  pmm AND msc -> ftq  pmm XOR msc -> z25
// y26 XOR x26 -> dfp  x26 AND y26 -> gsd  gsd OR kbg -> cmf  mbg AND dfp -> kbg  dfp XOR mbg -> z26
// y27 XOR x27 -> swt  y27 AND x27 -> tbc  tbc OR nvm -> ghk  swt AND cmf -> nvm  swt XOR cmf -> z27
// y28 XOR x28 -> pgc  x28 AND y28 -> crb  crb OR qhw -> vbp  ghk AND pgc -> qhw  ghk XOR pgc -> z28
// y29 XOR x29 -> fht  y29 AND x29 -> drg  drg OR wbb -> nvq  fht AND vbp -> wbb  fht XOR vbp -> z29
// x30 XOR y30 -> gtd  x30 AND y30 -> rkn  rkn OR mck -> dtj  nvq AND gtd -> mck  nvq XOR gtd -> z30
// x31 XOR y31 -> trd  x31 AND y31 -> nhq  nhq OR bjf -> vtg  dtj AND trd -> bjf  trd XOR dtj -> z31
// x32 XOR y32 -> bkh  y32 AND x32 -> skt  tbt OR skt -> nwm  vtg AND bkh -> tbt  vtg XOR bkh -> z32
// x33 XOR y33 -> rpb  x33 AND y33 -> jtq  kmb OR jtq -> ksf  rpb AND nwm -> kmb  nwm XOR rpb -> z33
// x34 XOR y34 -> bhh  y34 AND x34 -> vkh  vkh OR dcc -> brg  ksf AND bhh -> dcc  ksf XOR bhh -> z34
// y35 XOR x35 -> jng  x35 AND y35 -> cnp  bbb OR cnp -> htb  jng AND brg -> bbb  jng XOR brg -> z35
// y36 XOR x36 -> qnf  y36 AND x36 -> vpm  thg OR vpm -> wkk  htb AND qnf -> thg  htb XOR qnf -> z36
// x37 XOR y37 -> hpp  x37 AND y37 -> ggw  ggw OR gpv -> ths  hpp AND wkk -> gpv  hpp XOR wkk -> z37
// x38 XOR y38 -> phr  y38 AND x38 -> kmg  bdg OR kmg -> hhd  phr AND ths -> bdg  phr XOR ths -> z38
// x39 XOR y39 -> qnv  y39 AND x39 -> bdr  bdr OR tct -> pbt  qnv AND hhd -> tct  hhd XOR qnv -> z39
// x40 XOR y40 -> ttt  y40 AND x40 -> fhh  fhh OR hkv -> ttv  ttt AND pbt -> hkv  ttt XOR pbt -> z40
// y41 XOR x41 -> jkb  y41 AND x41 -> rgv  rgv OR bvs -> mdd  jkb AND ttv -> bvs  ttv XOR jkb -> z41
// y42 XOR x42 -> spr  x42 AND y42 -> rcn  pdt OR rcn -> dpg  mdd AND spr -> pdt  mdd XOR spr -> z42
// x43 XOR y43 -> gnj  y43 AND x43 -> hsd  hsd OR nsf -> jnj  gnj AND dpg -> nsf  dpg XOR gnj -> z43
// x44 XOR y44 -> nnt  y44 AND x44 -> vdn                     nnt AND jnj -> qtn  nnt XOR jnj -> z44
//                                                                                 vdn OR qtn -> z45



// y36 AND x36 -> qnf 
// y36 XOR x36 -> vpm

// x26 AND y26 -> z26
// dfp XOR mbg -> gsd

// psw OR nng -> z12
// nhb XOR cdq -> kth

// vtg AND bkh -> z32 
// vtg XOR bkh -> tbt

// gsd
// kth
// qnf
// tbt
// vpm
// z12
// z26
// z32