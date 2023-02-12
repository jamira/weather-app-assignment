import React, { useEffect, useRef, useState } from "react"

export default function useDynamicSVG (icon, options = {}) {
    const ImportedIconRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const { onCompleted, onError } = options

    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {

          try {
            
            ImportedIconRef.current = (await import(`../assets/${icon}.svg`)).ReactComponent

            if (onCompleted) {
              onCompleted(icon, ImportedIconRef.current)
            }

          } catch (err) {
            if (onError) {
              onError(err)
            }
            setError(err)
          } finally {
            setLoading(false)
          }
        }

        importIcon()
    }, [icon, onCompleted, onError])

    return { error, loading, SvgIcon: ImportedIconRef.current }
}
 