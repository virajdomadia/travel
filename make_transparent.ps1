Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\Viraj\Desktop\travel\public\logo.png"
$destPath = "c:\Users\Viraj\Desktop\travel\public\logo_transparent.png"

try {
    Write-Host "Loading image from $sourcePath..."
    $img = [System.Drawing.Bitmap]::FromFile($sourcePath)
    
    # Get the background color from the top-left pixel
    $bgColor = $img.GetPixel(0, 0)
    Write-Host "Detected background color: $bgColor"
    
    # Make that specific color transparent
    $img.MakeTransparent($bgColor)
    
    Write-Host "Saving transparent image to $destPath..."
    $img.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $img.Dispose()
    Write-Host "Success!"
} catch {
    Write-Error "Failed to process image: $_"
    exit 1
}
