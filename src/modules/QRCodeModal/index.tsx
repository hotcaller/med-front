import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconRefresh } from "@tabler/icons-react";
import { useUserStore } from "@/shared/store/useUserStore";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRCodeModal = ({ open, onOpenChange }: QRCodeModalProps) => {
  const userId = useUserStore(state => state.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Create the QR code URL based on the user ID
  const qrImageUrl = userId ? `/qrs/${userId}.png` : null;
  
  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [open]);

  // Function to handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Function to handle image error
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    toast.error("Ошибка загрузки изображения QR-кода");
  };

  // Function to retry loading the image
  const retryLoading = () => {
    setIsLoading(true);
    setHasError(false);
    
    // Force browser to reload the image by appending a timestamp
    const img = new Image();
    img.src = `${qrImageUrl}?t=${new Date().getTime()}`;
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR-код для подключения</DialogTitle>
          <DialogDescription>
            Отсканируйте QR-код для подключения к системе уведомлений в Telegram или <Link to={`https://t.me/OrgMedBot?start=${userId}`}>нажмите сюда</Link>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-4">
          {isLoading && (
            <div className="w-64 h-64 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          
          {hasError && (
            <div className="w-64 h-64 flex flex-col items-center justify-center text-center gap-4">
              <p className="text-red-500">Ошибка загрузки QR-кода</p>
              <p className="text-sm text-gray-500">QR-код для пользователя не найден</p>
              <Button 
                onClick={retryLoading} 
                variant="outline" 
                className="gap-2"
              >
                <IconRefresh className="h-4 w-4" />
                Повторить
              </Button>
            </div>
          )}
          
          {!hasError && qrImageUrl && (
            <div 
              className={`flex flex-col items-center gap-4 ${isLoading ? 'hidden' : 'block'}`}
            >
              <div className="border border-gray-200 rounded-lg p-2 bg-white">
                <img 
                  src={qrImageUrl}
                  className="w-64 h-64 object-contain"
                  alt="QR код для подключения"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;