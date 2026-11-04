import Foundation
import CoreImage
let url = URL(fileURLWithPath: CommandLine.arguments[1])
guard let img = CIImage(contentsOf: url) else { print("GAGAL_BUKA"); exit(1) }
let det = CIDetector(ofType: CIDetectorTypeQRCode, context: nil, options: [CIDetectorAccuracy: CIDetectorAccuracyHigh])!
let f = det.features(in: img).compactMap { ($0 as? CIQRCodeFeature)?.messageString }
if f.isEmpty { print("TIDAK_TERBACA"); exit(2) }
for s in f { print(s) }
