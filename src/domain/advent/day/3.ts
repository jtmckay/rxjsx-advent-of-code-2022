import {
  bufferCount,
  filter,
  from,
  map,
  pipe,
  reduce,
  scan,
  switchMap,
} from 'rxjs'
import { newAdvent, solveAdvent, solveAdventBonus } from '../command'

export function sumReducer(acc, current) {
  return acc + current
}

export function day3() {
  newAdvent({ id: '3', input })
  solveAdvent({
    id: '3',
    transform: pipe(
      map((i) => i.input.split(/\n/)),
      map((i) =>
        i.map((j) => {
          const first = j.slice(0, j.length / 2)
          const second = j.slice(j.length / 2, j.length)
          const repeat = Array.from(first).filter((k) => second.includes(k))[0]
          return alphabet.indexOf(repeat) + 1
        })
      ),
      map((i) => i.reduce(sumReducer))
    ),
  })
  // Original solution
  solveAdventBonus({
    id: '3',
    bonus: pipe(
      switchMap((i) => from(i.input.split(/\n/))),
      scan(
        (acc, current) => {
          const group = [...acc.elves, current]
          if (group.length === 3) {
            return { count: 0, elves: [], elfGroups: [...acc.elfGroups, group] }
          }
          return { count: 0, elves: group, elfGroups: acc.elfGroups }
        },
        { count: 0, elves: [], elfGroups: [] }
      ),
      map((i) => {
        return i.elfGroups.map((group) => {
          const [a, b, c] = group
          const sharedAB = Array.from(a).filter((k) => b.includes(k))
          const shared = sharedAB.filter((k) => c.includes(k))
          return alphabet.indexOf(shared[0]) + 1
        })
      }),
      map((i) => i.reduce(sumReducer, 0))
    ),
  })
  // Refactored to "stream"
  solveAdventBonus({
    id: '3',
    bonus: pipe(
      switchMap((i) => from(i.input.split(/\n/))),
      scan(
        (acc, current) => {
          let seed = acc.elves
          if (seed.length === 3) {
            seed = []
          }
          const group = [...seed, current]
          return { count: 0, elves: group }
        },
        { count: 0, elves: [], elfGroups: [] }
      ),
      filter((i) => i.elves.length === 3),
      map((i) => {
        const [a, b, c] = i.elves
        const sharedAB = Array.from(a).filter((k) => b.includes(k))
        const shared = sharedAB.filter((k) => c.includes(k))
        return alphabet.indexOf(shared[0]) + 1
      }),
      scan(sumReducer)
    ),
  })
  // Refactored with learned RxJS operator "bufferCount"
  solveAdventBonus({
    id: '3',
    bonus: pipe(
      switchMap((i) => from(i.input.split(/\n/))),
      bufferCount(3),
      map((i) => {
        const [a, b, c] = i
        const sharedAB = Array.from(a).filter((k) => b.includes(k))
        const shared = sharedAB.filter((k) => c.includes(k))
        return alphabet.indexOf(shared[0]) + 1
      }),
      reduce(sumReducer)
    ),
  })
}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

const input = `gfWpjRRQffQGCHHJsGqjsj
SclzJZZvmmnPbJtVSqqNBqVCBdSCsd
tlbvZJDZtmtPcJmlPnhMFQWWpMRFTfLDRRTWRp
HjMPgSWjVrjgbHRRSSMRgjRdpdbGdlcdCvQfcCdlwQJfdf
LNDnhtNtLNFFZDtFnhzvdldDflvvDCdlJfldpJ
ZFLFZZmFtFtTNTSPRrVPWWMpRP
qLBSBLRwmgzqCbzCffDlrfCV
TFFFHNWFMFFMpHpGHMTHGNhrldWZCsdZsslZlZfrflDVss
PTMcPGntTThHhTGctnMvSwjjvmmqLBmnjqqgCR
nClJtMwwntqVVPJcgZqq
mjpsDcrcSSFFPZqFBWWgVP
vQcjsvhrvvrmhbmNHMNnlHbNMtCtNM
bgvvhnTQtjrrrhsDDf
pLSMltLzLLSjFrSSjrSJHD
zNWRLBdZPllPQtCvttgCqb
DRlDrrFTNDNlgzsGTBfcnqhhcnJfcrCSqc
MMmmdWtdLmvtldHjMmQfPBqSJWnfCCCqcWSSPJ
vjHMjLmjpLtHptQLmHvwTRgNVVpTzZFZgZRlsVTN
rzpMpDCGFCFFjRFsRPFRNFPv
fWclbHCHtSmfvjnmfsvZ
wTcTlSwwtQtWclBQBLGMLMCLVzVLwJGqLd
MQSjLNjPPLLSBPjfQhSPHjDVCjDtVVpDHwbwVpbD
RcmWzsRrzZrmTszWRqWlmRJscbtHwCbndCtcDVddDpdnVnbt
JTsrGGTqmwTlWmTzJzWmhhPLLGgPFgBffSSPhFFM
qMMRNZMDDNWLPqfzCgDcGncVDCgG
wwBFhwhhBgmcVzhghG
tbJbjjtJvwtdtwjpFtlbvtdTLNSMqNqMMgqNHPlZRTNggL
qmjMHsZmZSbjbZMjSLFFFFwgsgvFswpwww
hRJBhmnhhvFFwhcv
llfWDWzrzBNTRfNBrWzzTmZbGTMjPqMmZPjVbSZGSP
CRRPLwwcclcGVppQ
SHFjDjjHDTfSDNTTHfSHjQVGrpmllQQWltVVVZGp
HFlqzDTfqlzwbgPJLwCP
WRCNLphpLppSCWVHNfLRzVnQMnBnMddPMQDFQgrhPQFM
jTjJqvqjvPVJFJFBJF
qTsZbvGqqZlstsmZVljtwqwSHHNWczHSSRcWNSRHzzNfbW
glgzDzHjSrVHcVgbrjmNsscNGmNWssGNNtst
hHPQLHJpwdLpdHfQQtnZmNMwnZGZWwsFZM
QpdhPJRTJfPphJfhCBlVqVvgvVDBbvVqDbHD
VtHzjZpjVtHrprgGmjHsGHNdSJFQRcLJqCdQcSqJNpcq
bBWfTPwhbfDlMnhffRwQJQNdqJcLFQLSdR
bhBhvfMWTnlDnTBfPSmvmjsjmmGtzHtsHm
pcRPRPWrSDcJGZSStmwZZS
VnLfCfTlfVzfnMMBCqVNZJdtjNtJjhJdGNNbwT
BLvqCCMVsnRQsPQgDcZH
cQbqqQhDGhlQfQlhQrqGsTNgLgCpRgLTPPPLNbpg
wtHVddVFwSHznZwwznCpRBdjppNBNTTdCjRR
ZtWFwWtSmvVnwZDrCMGfQlDDJQmD
PzPZGCZzrZrlhdjdCqfCsqQdRD
cbvZLVVFvbbNSNFHSDnsDQdnfqNQDRngsR
FJHSLSFSScJJbWHFmFVFSZmrrzBmhtBwmzBMPMPzPh
nlpFcLBgcVcLbssGVBGGrlpGPhJJJJJqPBZPDNMQMJJhJQZZ
SSTjHzfHwtZSPVQVQMRQ
TzVHwWfTtzwdVzsbFnGgsbdcGrLc
FppVBRVZDdLmrDGmmfrQ
NtNMPNshJCzznLGJSrqRrRrr
tRssthhPlCWhPzsWtzhzCbVVjwTpVwdZZTpwjbdBbwBc
TTWblHWScvPCCHTWFzSrqqsNNSmdmqrrpz
RLRwjjnjZNprzmmZcq
QQgtQnccQDGjgLDRRcLthQhFBvCbMtMHTWlBFllBbFCMTW
WnBVNvDnVsNvZWdrWDLVDMbsHpTjpHCSSClsbSCCMH
GPFtmztzgPhRFtJTdbTwjppSCjpgSl
hJcfPtQhdtWNVZqNnqNQ
GLcqZPPsnqQcFsmBBrqRvrddNqrC
MtHthJwLllwvjRvvtrvBRS
VHMfDLbpfznszZQG
WBSdPlQPRfBtGQPfBGPBJgzgjwsJzsszJwCrdwCT
ZpppVpMVpnVHMVVbZRJrCgwRzTJrwNJw
MvhmnpLqLmhVmBlftRQBFSlR
hhQlSJqhtCSnqZJnqShSlNDwRzpvdwRlMBMMdcjRjMpMRc
frrGmLmWbfFrsmFHmBzBvBcwdJbvpjzbMM
mmgFrVGLWJLFGsgfhSVtVPqntqnnSStN
SFJTJTSqswwFQbwf
cDtcWPclrtPwVsfssQmN
HDtwWCgWdggdzSGJMSzGMq
JpqJtWRJMhCMJpMQCWtFrjgHdgdlgllwNjlQjldH
fBzPZcZvnBmDnZvZBZDmPvglVVVdgHHSwrNRgVgwNPRH
GbZnZccfvcsZmccsmnnZTRbCCMWFTWJqFCCMJFRT
vrrFqrFTBTmLmNrLMqMTHddJbHpWnhdWdWbHhJGM
wBzfwzcQSzWSSshpdWGp
gwjPPPDQtzQlzQDPqTgLBRmRqZBvqFNR
bWVptFFsbPcZsGLhsZGmLB
qnWrnrHdMCDCNqfWmvRRZSSRLdRGZGRG
nNqqNDfMrMWHDQNHzWfHNDnwzblpzFlbwtFbVVlwVcPJpP
BHJhlHdJQggvddglJBBhglhQzZHPZpFFPDMzFDDRDFZZDFZD
rSTfqnCffMfCVfCLNqbzbjWNDbbWDPFpPFbP
nfnnrSfCTVSwrqSLCGfTGlgQhlvsGMJQJBhhssJhGc
tBjjDjjqfDjLfJlrLgglvmrlmrcc
TwNNTVhwwpgvGSNNSssS
TbwhnvvChhbVRTPPRJBJQQfJttMQQJCQfW
mWSvSQVgmWQsQvspQJlrlLnJLLpCClhhlp
bFHRjZdNjjBZzFzhtnCllCcJLrCBll
HFFNHbdZZLZjfPFjHVQmWDDVsvsmTqVqDf
JJPllQQClqgBCgdHwHbpjVTwHd
tmGZtjGjHZpVbfMT
ShGjNGWmDSNcNRtGmshDRzzCvzQJJRBLrvlrBPJv
cTpqsTWqVVpsNLfvCDFlMFDVFL
JnndJPddQgzHlvMJFDhLCG
BjtntgdRnQgzjdBRQBlpNWrTTlNTSwNpWS
qHmqLVLjmVqsDBLtmjmbtPwCTwwPzGWRgGwGwMwW
ZhcCNCSprRTWTwSnWW
hflhZvvQhppZfcNpvrhpQHjVjLmbVmmVHVCFDvqVFb
nnNrwDnZrspwDNnZsNSDsNbCmpjvMTPQjLMmPmmQPGBTQP
FdVtRdRfctBQPmTtTLQB
qhzWVWJqVHwbhlLSsS
htWmhDhFztnztDhtBmBtghPRSrpfjVwPdfPwpwnRSVrr
cbCHvgJGcTqbqcbqqqcqsMsRVrSCwffdRPPpVpwCRSwfjj
GlgGQqTqbgQzttmBNNFz
NWQNQgdTgjQNddTZfrCQWRDnnnbqnLqnRcjJlqqvDj
FtSSmSmJhpllcclDvpln
JBVVSsSFBVBttShFGSPQfCGNdrMfZZTQTZNNdC
HgHthMhphcbfbMMfHhsGGDCRRVlcVSScsCRz
nWvPFqLqPNdjnNLnjdJnPdWjGlssDPSsllVCRzlTCTGlSDzS
RvddJRJQHwQwpZZb
gdZwgpjZZQtHTdrWrwdpWRnlhNBRlLbFthNhflhBnL
CVzDCPGMVqVmGsGGbJCmCDvMcRcqnBFFFnRBBNRBBNqhnFfF
DsmSGsGPzvMGJvdbgTSTbjbSSdgH
jBGmbNBQGdBNNDJNQRLLVDsHtDRzHHZZcH
wCWPFWPCrPhPrplvprhwpCHHtszttqZslRVHLtzVlJZL
vprMMvMnJCwnnPShNGSTfGSfNmmgdNff
bPtLbvVWWztbLSVVnbszpzQsrcDDBdpRcDrs
llZmgCZqgCFgmdRdJcscBdJsmQ
FZlgfqCFfgZHlqCMCglwCFGWntLLSMRSPGPVttWRtVGL
vtnDsDtrnrSvrMVmbrrJgPCmBm
FpQHzFclLVzWHhwHLQLlHLzPmMBQCJTdTmCTmBTJTTmgQg
pllcVWqlffZqZtZD
TSSZWpsQmZWcTZSvsTTTppNPzrBPrNBrzQNVFrBBNPqP
CgjmCbtGgftMmLtLmffzBzJJJNVVMNzNBqJrFN
gjgjLgtLwgbGjHdhhGdvmlnllnpWnplZvcvwTl
htLrRFRtbbhlGSLRtbJBJsjBmgMMgJgtmBzz
pZQWddQQfpZZffcDQZwddQwDMqDDsPgGJJzzjqzgJMBJgmms
QdcQTdwpGNwfrCRlRVlNLSbb
wrdvpVBVpMGPPjWjGZJJZT
tChCSlNfCCHtvHHWPHPZ
RbRRNvmcqcblfMwwdVBQQqqdpL
qcctqRcqmcHWzHBdDMZhfwthBnwt
JFsSNMSgNSNJJMGJBBdjhFDfhwhBrwnZ
TbgbsSgJMTJllblLCSPlsTCVQmRVVWpQzzqpqzVzHLQzcc
CVcWbjjSSCSSnpjWpCpprhHZlHtHGzHrZrHGclrl
gqZqdddLgmgNqvTGGHvvmrrGHT
FFDgZfZNLMgNfdDqDRnsnjBpbSbnMBBWpQpB
qwpQFwRnqFFfSBSfFt
LJJLGLWWtZlbgWHgGshhSdSVzmhHmfVzzC
lrbrbrNNJgDMLLbblGctvvvDqPcqctTTTcqP
vnblvbfHvlcHMlHlZbSPLTPLwCMBRRPRRFFR
tszzBqtzDsWVPRSmzLVmVL
tsNsDDNgGsqBrgBpgdHQbfhflcHdpZvdbh
cCpLtpGGLsgsppcpmGGHMtjfHRVhvvVVFRfhjV
NWnnnNNndQnQZdCdzzRVMHzvhhHWWWjj
CPJJrnSZpGDJLGTL
cnJzpcnmnQVFbzTlvTHBlb
tWCDPjfsDGfZhddhjjdTvFTgFgvbnFHvdHqT
hjfCjwDDGjPthsfhsnGNrJcQcRmJMLVJrJNMLw
CPPRrSlRccPcwTHwfdwTHdfl
mLQLLjhQhhQLZvpzssHDhdTswzzTJD
gmjbBvQLWmgbQZBCSRnnnSMVCBHnBS
sWrBJbsVqschzhQzHh
gtFmztnSlSfdlmnZSdSwcwGRTjcTcwwTcHccRg
FzFDzMZCdDZtCSrJVBMqWVrqNBqN
TvWlhhfhZJVgtSSl
ddBdGGdFmmBbdzqqPDDGGmdDZSgttHtZppSgzZHSgMhtMgtz
PGqdrbbbdPnrcjjhTRWLLc
trrmJWcrVwVbcPScdcBdGPHH
JTQnfjlJTpQFfMLlNJHHGDPdGsSdDjHGDPPH
ffFfnCTTCfTlplTMvNVzqWvwVzrrhwmWhJbW
hVtDtgcghzJpmmhlwp
srsnrqqsPqsBPvnqRBRMPbnwlplpmCStJwmzJPtJzJfwSw
bbrqjBbvGsjGGBWqMVFFVDNVNjZjgtgFgZ
mnmhBDHhwWCHsTgRsH
dcSlFvccMFMMFFggNsTzzvvzWnVW
llQdllZScFplJPpdcZSqBqjhmtnrwrDGnQGhrq
ZffVNgfTdmPVltsnnGwgQDnB
rMCFLMHpzCMFzHpzbrcHFLzBwsDsDDnlDBJrDDBBSJSnBn
MLMjMzqpCzvwqTmwZdvq
DDNlWPRqgPRPsRFjJQZbchJZbgQJ
zzrLLznpLbHnjcBHvVvHvJcZ
ndmrTzbMMTfzrTfnTLrzdpmsPPPqlqGDNNsPCRDRqRsD
zzdqTNfTfdfhgQhgqMFSjRDtDRWHqtWlwtqDRS
ssBCrcmpVGZvVRDdSDRwtmWdDb
rvGPCZLCVCPVBZFdnfThgNgLJNhf
bslcrssQwDPbQrrcsbsnQrjMLthPMMRhLRhLRgzmgPhRgM
DffvDfHGfNFdpfTdMtghLBThzVmBhBtM
SNvJNJdflDDbcDWJ
HFlHNpWsTlGWbFsGFTGHFLLNzPPhLVPMzVzMNPhhzP
jSvZtmrqqpcrCpPVzw
dddQvqDgDmjdSQQdqZjStpffWGgBRWTGfGsRlWBlHF
THnTbNrdBnLTHHnTnBrWRTndsccZsLZcDqmLDPcDlQDsmmsZ
ptwzzhpvGSVdqQlmszqmqPqc
wGVjSddCBggCHFWN
LFFbdbhhhvwvfTNdRhhRRvMbHDGjcfcGfDjtDHHcHqGjDqqj
WlQnVpWSSWWsPsgDqDzHDLHjJcttGP
rrWsZrgVnWrWSlmSlmSBFFbvTThhBFvvZLBhRw
BgBdcjThvjFcTggrqvVfzlnnPlrqLt
JpwJGPsQwpwSssHpPLlzlnNlzLLNNLVtsN
JPMmWGmWPmHbHpJbWGJmDmwbBTRZMBBdZCRTRjFjhCZCCBTT
BjbcLFRfBRhnbGjCVVvPllpcPtcDmdlPpvPP
WrMQqCNgsqWWsTNCMZMWWsWPvJDJDddvlpDtZDpDDDDwvP
qNMzzSzSQsGLbFCSCnVR
tTRpHJQpQBZcddhhMhvhJN
zswljflgMFbwPqmNmSdvShLNfLhm
qFbsMCVgsqMwRWHCWDDBDWpt
VSTCCWsJvGpHHCNC
GrqzZrrZjDljcDDlfjMqgRPfPvQPpBHNvHvBpvNQ
rljncDcznjMqhlhZDnltrzhTsGWtbVLFTTWGsbdWJdFTmL
mJPDSJJPZPJNrprSNrDmpZGrhFFhBqjGbGGVbFjhhfqBjBRV
cgnTQHdMQdTHdhqfggBhVqVfVS
nQdLLddssSJrmsNvZrPz
jfjffQzZQQMzZZfZZQFgjDWBCRlCBdTTBGGGRpBCgdhdBG
LrstWtNsbHLsprRBdlGpCwlh
HLnntbnscqLvvPNNfMWSSmDMDPjzjDzS
vhcGwWVvglltcfBn
BBSLrzSJLzJNJrLfPfPRsmDRmflD
jMjFZJNMqzrzZzFNFjNQqJzbCpBBvWdpvTCWhpVwdvHVCGbG
HlrnFmRmtRBQPVBTQHHQ
psSLJsLpTTdPdLTv
fCGgTgfSSCtRtFFzql
pfTpStppcDlWfbpDdzQRsQGJhfffQgJHzN
ZFZFZmBFwVwBVmLmLsRLRhHNzRLRNNzJ
FnnjwVPmnqqqjBjrTdblldCTpcPJtbTD
bdZHdWlrjslMMwGG
rDDTRBTqSqmJLBJRBTSJpmMsMMjhwvfMhjjfVGsLshhC
BqQFRPFRQBJgzrcZNHFdZt
wrDdLlDdPWZPTTrwlZpSsPsHVHsSCHnbzMHM
JtNFttNCjFvpppnMpJgSVS
NFFqFcCQCvfrZmGdZdmqrW
GMNNfJnNddJFJWsv
HSDwCmmghLmwmmHDpsvdFpMWpppptSbp
zCzBCgzhwmhzLrPnVrMqZBNfGf
DrHGtbltbCjjjffPrgsmzmcqsgDczdsmgJ
VZLwQLZLLVwLBQZnLVphhLQQqsTNmzJdcNTzzmJNqlNBsszz
wZLhVMplpQVRRlpVGPfjCjMGCrbHGWWb
BHpFrHHbBNTWWTWNhCPwPLNPjCdjLV
zJRRzJvZlcZsSMJdzSDjDtfDCtDtjDjjjj
dcJcszQJJGRJzRllMpGHpFTWmrTmBTbWWB
qnWWqhDhnjmjCMBlNRrfVfRNCB
vvBLBtGHJTHBddrNVJrVSVdr
BZLTHbgvHvTFBgTFFvhmWmmZDPmmZDsnqncs
WBvmjDbSzTMmHHdpNHNF
ttlflZRfGtfWVRltGtflCdHnJrNJHNHnJddNMNCnpF
VVwssWQQfRGZcszBQzDbjSBvSBDP
lSlQqQVqWWVWfqQWVJSTscdmPPwwTTmjjfpjPp
FCbzHbvHvtgrtFCvbvbbwdTwmsrwnTTpmdswmwcc
DtZbHdghztlLMQlWWhVQ
pqzzFSmdFqbQvlpdDGGrGBWPPBVNQnVttZ
cgcjwfBMhHCjjLMCrtcnPcsnsPGVnrVs
JgCChjjjBHhRRLLjjhplzvzpSFJvzzlDbSqm
mZzVQZMhmrffwfQhWhzmrmpBtRcdbnbcdcMpBbDbncdD
jsLTSlTWRBSDpnDn
GLTsGWGFsfmJGZVJZm
BGWshBGnsFWSLWBLlSSLWRJHnrVPrPcNHCNHctnPPJ
QmvQCqqMTZqvgmvTjpZCMgMtrVctPptHtrNVrptbJJbrRP
CzjCZfCwDzShDWdF
HmQlQHmJnpmptmzt
MTqMjMPvTvVvhpdztZnSwzwZqS
CcbLLPTMtCCsjHNHQFLRRFlRNN
GDFwLLLLSrbdPlFBMFsslFHmZH
TnJCgthHpVTfZMQZQmzWnZ
hjvtjtghtqJvVjhTgNhJTvdvdDDRbbccrwPdcGwrHS
MQQMBPzMGQBPBbDQPMhpnRwsGnRhNrFFpRnF
vmgHcmCTTlvvvZvTmqcTfmCRdddFnwdRdnVwFpVfpRnwNw
gvmqJTcHclCQJNzjMLWbLj
DbqqDDbQFqfNtZSLSq
RrdjPdmrpWBdmWRdccfLtNttSDMZBfftLMLf
dCcgmgRrWcgcppjCVVVVFHFnDnbJnb
fZMFfrtVdZSDVwTgjRMLhwTCLj
cNzPBNpclllzHbmTNRhqCRTgjC
nhhWJzhGPlQcGvsvfJtSfZfrtt
PSzrBWQBBGzBlnSnWtDrqHfNfwVwHcLNjHjwcDNmFH
hbRhtRCRpRvsRgVVVcNHNNNCwLwc
ZtRTRvttWWzBPlGZ
tcLnctNsJrWWNDTN
pwPPSjHSHHfzvmSvvvFVVGqGVqGmFqrDWgDr
pPSvfPQMzCQCSbhllLnQDhbtQZ
DmLffDhpVhjjVwvbwNVFbbNSNH
JRPBgMPRHBrMHMHqrBMqWJBSQQNbCvndNrdvCNCFwFrQnv
WcqJcPGMGtWRRBtgZjjspGHTLHGHTppm
ptJtWJpqRwDZZDVWpbDWqlvvflfMjlfCMjdCCdtslv
rLwTBGBzBBQTzmwCCjvdvlLllddsMl
NBwTmrGNgrTrcgPpWgWPDSVVPW
CdglMnrlSSqDPpcsZb
ccwmVJtvVvVtNhBpBFPDVpqbbD
TRGQjJjGTmtrTCgHWLfrcn
JNNhLwWwWQHNPDmmjHpc
zMqZCvVCSMVqMSTVvZVGsBnlslpmsmzlPmsHPsPB
qTVqrgdCCbhfHJQFtg
wNwCBBCZsfQWfmLCGSmmFRGSSF
zjnPHPVqMhhZLTcbpbSncp
lVlhlgzlPZlwtgBddJdfvf
JWRWRRLWJLnjtjnLzGzznflBvfPvPMqMDqdbzblCzC
TTScTVbHmTsVFrmcsgcHFlPMMvlvrDPdlrDDqdldvl
bVpcpchgsFZHbhSmSTsHFFjwtZjnjLttntNjLjNLWtjw
rffjPJzWzrgPpGWHVNqTtmqFTVRH
cswhvlLBvSLsCtbFccmqVFNTbb
wwZSCZSnCLsSDGgDmpGnfmmr
rTfJTNtjfNljlrWSlzRtNlTqsddwGnsnHHwwhssTsnqw
VpbpZZbvPLbZbbBhwqMHhsGMnJdVwV
mgQZJDLBJbbbcbgZClCSfWlrCjRjlDCR
fSpwcVfzsztcSSWNNMbnMRqTvtTv
mJFmGDDDhGhBJHCQddllqTvCllqTRRWNnMbT
FdFDGdDDDhhHdZDjhDmpwSPVZszpwZsVgsPRZs`
