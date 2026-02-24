import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { uploadAvatar } from '@/lib/database'

export default function ProfileImageUpload({ userId, currentAvatarUrl, onUploadComplete }) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(currentAvatarUrl || null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (event) => setPreview(event.target?.result)
    reader.readAsDataURL(file)

    setLoading(true)
    try {
      const result = await uploadAvatar(supabase, userId, file)
      if (result.error) {
        alert('Failed to upload avatar')
      } else {
        onUploadComplete?.(result.url)
      }
    } catch (err) {
      alert('Upload error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Avatar</label>
      {preview && (
        <img
          src={preview}
          alt="Avatar preview"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px',
            border: '2px solid #007bff',
          }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
        style={{ marginBottom: '10px' }}
      />
      {loading && <p style={{ color: '#666' }}>Uploading...</p>}
    </div>
  )
}
